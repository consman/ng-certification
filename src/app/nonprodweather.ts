import { effect, Service, signal, WritableSignal } from '@angular/core';
import { Weather } from './weather';
import { ONECALLRESPONSES , GEOCODESFORNONPROD} from './mock-data';
import { BobsCompositeOcr, Jeocode, OneCallResponse } from './funTypes';
import { initialBobsCompositeOcr, initialGeoCode, KNOWNGEOCODES } from './refData';

@Service()
export class Nonprodweather extends Weather {

  constructor() { 
    super();
    //effect(()=>{});
    
    effect(()=>{ //A
      const zipInProgress = this.zipInProgressSig();
      const startedJoecode = this.startedJoecodeSigA();
      const joecode = this.jeocodeSigA();
      if(zipInProgress && startedJoecode && joecode && zipInProgress == joecode.zip){
        console.log('eff A Success! JSON.stringify(joecode): '+JSON.stringify(joecode));        
        //We are good to go so skip C and go to D
        this.bobsCompositeOcrSig.update(b => this.mergeJeoIntoBcor(b,joecode));  
          
        this.startedOcrSigC.set(true);        
      } else if (startedJoecode && !joecode){
        // we need to go to use geoCode B and get a Not Known
        console.log('eff A -- no dice - headed to eff B.. ');
        this.startedJoecodeSigB.set(true);
      }
    });

    effect(()=>{ //B
      const zipInProgress = this.zipInProgressSig();
      const startedJoecode = this.startedJoecodeSigB();
      let willNeedReset = false;

      if(zipInProgress && startedJoecode) {
        this.jeocodeSigB = this.getGeoCodeInfoFromZipWoKnownGeoCodes(this.zipInProgressSig);
        willNeedReset = true;
        //console.log('eff B working... . zipInProgress = ' + zipInProgress + ' startedJoecode = ' + startedJoecode);
      }
      else{
        if( this.atLeastOneRequest && startedJoecode ){ 
          console.warn('eff B is not going anywhere. zipInProgress = ' + zipInProgress + ' startedJoecode = ' + startedJoecode);  
        }        
      }
      if(willNeedReset){
        this.startedJoecodeSigA.set(false);
        this.jeocodeSigA.set(undefined);
        console.log('B INFO from A now reset: jeocodeSigA()= '+this.jeocodeSigA() + ' this.startedJoecodeSigA() = ' + this.startedJoecodeSigA());
      }
    });

    effect(()=>{ //BResult
      const zipInProgress = this.zipInProgressSig();
      const startedJoecode = this.startedJoecodeSigB();
      const jeocode = this.jeocodeSigB();
      if(zipInProgress && startedJoecode && jeocode && zipInProgress == jeocode.zip){
      console.log('BResult  in if ...');
        this.bobsCompositeOcrSig.update(b => this.mergeJeoIntoBcor(b,jeocode  )); 
        this.startedOcrSigC.set(true);          
      }
      if(zipInProgress && startedJoecode && !jeocode){
        //Did everything we could to find a geocode with no luck. This is now a 98888 case.
        alert('BResult The zip code, ' + this.zipInProgressSig() + ', is formatted OK, but no data is returned.nonprod');
      }
    });

    effect(()=>{ //C we now have a good geocode so get the one call response
      const startedOcr = this.startedOcrSigC();
      const bcor = this.bobsCompositeOcrSig();
      if(startedOcr && bcor){
        console.log('eff C started  in 1st if' );
        if(bcor && bcor.jeocode && bcor.jeocode.zip == this.zipInProgressSig()){
          console.log('eff C started  in 2nd if' );
          if(ONECALLRESPONSES.filter(ocr => ocr.lat == bcor.jeocode.lat && ocr.lon == bcor.jeocode.lon).length == 0 ){
            // This should not happen in nonProd. We have a geocode, we should have a oneCallResponse
            console.warn('eff C - No OneCallResponse for geoCode with zip '+ bcor.jeocode.zip );
            //alert('The zip code, ' + this.zipInProgressSig() + ', is formatted OK, but no data is returned.nonprod'); //TODO Fix this is does not belong here - you don't have a valid geocode at this point
          }
          else {
            let ocr = ONECALLRESPONSES.find(ocr => ocr.lat == bcor.jeocode.lat && ocr.lon == bcor.jeocode.lon);
            console.log('eff C looking good with a valid ocr and ocr?.data[0].weather[0].main = ' + ocr?.data[0].weather[0].main);
            this.bobsCompositeOcrSig.update(b => this.mergeOcrIntoBcor(b,ocr  )); 
            this.startedBcocrSigD.set(true);           
          }
        }

      }
    });

    effect(() => { //D 
      const bobsCompositeOcr = this.bobsCompositeOcrSig();
      //const ocr = this.oneCallResponseSig();
      const startedBcocr = this.startedBcocrSigD();
      if(startedBcocr && bobsCompositeOcr  && bobsCompositeOcr.oneCallResponse.lat == bobsCompositeOcr.jeocode.lat && bobsCompositeOcr.oneCallResponse.lat !== 0){
        console.log('eff D pushing bcocr onto the list with bobsCompositeOcr.oneCallResponse.lat = '+bobsCompositeOcr.oneCallResponse.lat );
        this.startFixMainSig.set(true); 
        //console.log('nonprod eff D looks like we are done - JSON.stringify(this.bobsCompositeOcrSig()) = '+ JSON.stringify(this.bobsCompositeOcrSig()));
        this.bobsCompositeOcrsSig().push(this.bobsCompositeOcrSig);
        this.doneWithPushSig.set(true);
          
      }
      else{
        if(startedBcocr){
          console.log('Something went wrong in eff D: bobsCompositeOcr?.jeocode.lat =  ' + bobsCompositeOcr?.jeocode.lat +'  and bobsCompositeOcr.oneCallResponse.lat = ' + bobsCompositeOcr?.oneCallResponse.lat );
        }
      }
    });

    effect(()=>{ //E clean everything up
      const okToCleanEverythingUp = this.okToCleanEverythingUpSig();
      if(okToCleanEverythingUp){
        this.cleanEverythingUp();
      }      
    });

    effect(() => { //eff fix main
      const fixMain = this.startFixMainSig();
      const bcocr = this.bobsCompositeOcrSig();
      if (fixMain && bcocr){
        console.log(' eff fix main and getting ready to fix it.');
        this.bobsCompositeOcrSig.update(b => this.fixMainWeatherIconName(b));
      }
    } );
      
  }

  zipInProgressSig:WritableSignal<String | undefined>= signal(undefined);

  jeocodeSigA:WritableSignal<Jeocode | undefined>= signal(initialGeoCode);
  startedJoecodeSigA:WritableSignal<boolean>= signal(false);

  jeocodeSigB:WritableSignal<Jeocode | undefined>= signal(initialGeoCode);
  startedJoecodeSigB:WritableSignal<boolean>= signal(false);

  oneCallResponseSig:WritableSignal<Jeocode | undefined>= signal(initialGeoCode);
  startedOcrSigC:WritableSignal<boolean>= signal(false);

  startedBcocrSigD:WritableSignal<boolean>= signal(false);

  bobsCompositeOcrSig: WritableSignal<BobsCompositeOcr | undefined> = signal(initialBobsCompositeOcr);
  okToCleanEverythingUpSig:WritableSignal<boolean>= signal(false);
  atLeastOneRequest = false;
  startFixMainSig: WritableSignal<boolean> = signal( false);


  cleanEverythingUp():void {
    console.log('cleanEverythingUpSig');

    this.startedJoecodeSigA.set(false);
    this.startedJoecodeSigB.set(false);
    this.startedOcrSigC.set(false);
    this.startedBcocrSigD.set(false);

    this.zipInProgressSig.set(undefined);
    this.jeocodeSigA.set(undefined);
    this.jeocodeSigB.set(undefined);
    this.oneCallResponseSig.set(undefined);

    this.okToCleanEverythingUpSig.set(false);
  }

  /* 
  A) use the zip to try to get the geo 
  B) try from from known geo codes first
  C) if that does not work, try calling the service "WoKnown"
  D) you have arrived here if and only if you have a valid JeoCode - use the oneCall Serve to get the OnCall Response Sig
  */

  override getOneCallResponseByZip(zipcode: WritableSignal<String | undefined>): WritableSignal<BobsCompositeOcr | undefined> {
    this.atLeastOneRequest = true;
    this.doneWithPushSig.set(false);
    this.bobsCompositeOcrSig.set(initialBobsCompositeOcr);
    console.log('---- nonprod getOneCallResponseByZip zipcode() = '+ zipcode());
    this.zipInProgressSig.set(zipcode());
    this.startedJoecodeSigA.set(true);
    let result:WritableSignal<BobsCompositeOcr | undefined> = signal(undefined);
    this.getGeoCodeInfoFromZipWithKnownGeoCodes(zipcode);// this.getGeoCodeInfoFromZip(zipcode);
    
    return result;
  }

  override getGeoCodeInfoFromZipWithKnownGeoCodes(zipcode: WritableSignal<String | undefined>):void {//  WritableSignal<Jeocode | undefined> {
    console.log('--- non prod getGeoCodeInfoFromZipWithKnownGeoCodes running for zip = ' + zipcode());
      //let result: WritableSignal<Jeocode | undefined> = (signal (undefined));
      let jeo:Jeocode | undefined = KNOWNGEOCODES.find(kgc => kgc.zip == zipcode());
      if(jeo){
        console.log('--- non prod getGeoCodeInfoFromZipWithKnownGeoCodes worked and jeo.lat = ' + jeo.lat);
        this.jeocodeSigA.set(jeo);
        //result.set(jeo);
      }      
      
      //return result; //TODO be careful of returning stuff! like here, simply update the class level signal with the result you have derived here. make make the function return void
  }

  override getGeoCodeInfoFromZipWoKnownGeoCodes(zipcode: WritableSignal<String | undefined>): WritableSignal<Jeocode | undefined> {
    console.log('Nonprodweather getGeoCodeInfoFromZipWoKnownGeoCodes going for '+ zipcode());
    let result: WritableSignal<Jeocode | undefined> = signal(undefined);
    let tempRes: Jeocode =initialGeoCode; 
    let found = false;
    let ind = -1;
    ind = GEOCODESFORNONPROD.findIndex(jeoc => { 
      const zc = zipcode();
      zc && jeoc.zip == zc;
      //console.log('zc = ' + zc + '   | jeoc.zip = '+jeoc.zip + ' ind = ' + ind);
      if (jeoc.zip == zc) {
        found = true; 
        tempRes = jeoc
      }
    });
    //console.log('Nonprodweather ind = ' + ind + ' found = ' + found && 'tempRes.lat = ' + tempRes.lat) ;
    if (found){
      result = signal(tempRes);
      console.log('Nonprodweather found geocode for zip '+ zipcode());
    }
    return result;
  }

  mergeJeoIntoBcor(b:BobsCompositeOcr | undefined, jeo:Jeocode):BobsCompositeOcr | undefined {
    let result:BobsCompositeOcr| undefined = undefined;
    if (b){
      result = b;
      if(jeo){
        result.jeocode = jeo;
        result.dt = new Date().getTime();
      }      
    }
    return result;
  }

  mergeOcrIntoBcor(b:BobsCompositeOcr | undefined, ocr:OneCallResponse | undefined):BobsCompositeOcr | undefined {
    let result:BobsCompositeOcr| undefined = undefined;
    if (b){
      result = b;
      if(ocr){
        result.oneCallResponse = ocr;
        result.dt = new Date().getTime();
      }      
    }
    return result;
  }

    fixMainWeatherIconName(bcocr:BobsCompositeOcr | undefined): BobsCompositeOcr | undefined{
    let result:BobsCompositeOcr | undefined = bcocr;
    if (bcocr && bcocr.oneCallResponse && bcocr.oneCallResponse.data && bcocr.oneCallResponse.data.length > 0){
      bcocr.oneCallResponse.data.forEach(da => {
        if(da.weather && da.weather.length > 0 ) {
          da.weather.forEach(w => {
            //console.log( 'xxxx main before: ' + w.main);
            w.main = this.getIconFrom(w.main);
            //console.log( 'xxxx main  after: ' + w.main);
          });
        }
      });
    }
    result = bcocr;

    this.startFixMainSig.set(false); 
    //this.okToCleanEverythingUpSig.set(true);
    return result;
  }

    getIconFrom(input: string): string{
    if ( input === 'Clouds'){
      return 'clouds';
    }
    if ( input === 'Sunny'){
      return 'sun';
    }
    if ( input === 'Rain'){
      return 'rain';
    }
    if ( input === 'Snow'){
      return 'snow';
    }
    if ( input === 'clouds' || input === 'sun' || input === 'rain' || input === 'snow' ){
      return input; // Disabling cache does not always work
    }
    return 'sun';
  }

    
}