import { effect, Service, signal, WritableSignal , computed, Signal, Injectable} from '@angular/core';
import { Weather } from './weather';
import { ONECALLRESPONSES , GEOCODESFORNONPROD} from './mock-data';
import { BobsCompositeOcr, Jeocode, OneCallResponse } from './funTypes';
import { initialBobsCompositeOcr, initialGeoCode, KNOWNGEOCODES } from './refData';

@Injectable({ providedIn: 'root' })
export class Nonprodweather extends Weather {

  constructor() { 
    super();      
  }

  zipInProgressSig:WritableSignal<String | undefined>= signal(undefined);

  jeocodeSigA:WritableSignal<Jeocode | undefined>= signal(initialGeoCode);
  startedJoecodeSigA:WritableSignal<boolean>= signal(false);

  jeocodeSigB:WritableSignal<Jeocode | undefined>= signal(initialGeoCode);
  startedJoecodeSigB:WritableSignal<boolean>= signal(false);

  oneCallResponseSig:WritableSignal<Jeocode | undefined>= signal(initialGeoCode);
  startedOcrSigC:WritableSignal<boolean>= signal(false);

  startedBcocrSigD:WritableSignal<boolean>= signal(false);

  //bobsCompositeOcrSig: WritableSignal<BobsCompositeOcr | undefined> = signal(initialBobsCompositeOcr);
  okToCleanEverythingUpSig:WritableSignal<boolean>= signal(false);
  atLeastOneRequest = false;
  startFixMainSig: WritableSignal<boolean> = signal( false);
  
  /* 
  A) use the zip to try to get the geo 
  B) try from from known geo codes first
  C) if that does not work, try calling the service "WoKnown"
  D) you have arrived here if and only if you have a valid JeoCode - use the oneCall Serve to get the OnCall Response Sig
  */

  atLeastOneRequestSig = computed(()=> {this.atLeastOneRequest && this.doneWithPushSig }); 

  targetGeoCodeSig = computed(():Jeocode | undefined => {
    if(this.jeocodeSigA && this.jeocodeSigA()?.zip == this.zipInProgressSig()){
       return this.jeocodeSigA();
    }
    else if(this.jeocodeSigB && this.jeocodeSigB()?.zip == this.zipInProgressSig()){
      return this.jeocodeSigB();
      console.log('using jeocodeSigB.'); //TODO find out why this does not work
    }
    else{
      return undefined;// signal(initialGeoCode);
    }
  });
/*
  targetBobsCompositeOcrSig = computed(():BobsCompositeOcr | undefined =>{
    const bcocr = this.bobsCompositeOcrSig();
    const geoCode = this.targetGeoCodeSig();
    if(bcocr && geoCode && bcocr.jeocode.lat == geoCode.lat &&  geoCode.lat > 0){
      return this.bobsCompositeOcrSig();
    }
    else{
      return undefined;//initialBobsCompositeOcr;
    }
  });
*/
  getOneCallResponseByGeoCode(geoCodeSig: WritableSignal<Jeocode | undefined>): void { //WritableSignal<OneCallResponse | undefined> {
    //let oneCallResponseSig:WritableSignal<OneCallResponse | undefined> = signal(undefined);
    const geoCode = geoCodeSig();
    //const oneCallResponse = oneCallResponseSig();
    if(geoCode ){
      if( ONECALLRESPONSES.filter(ocr => ocr.lat == geoCode.lat && ocr.lon == geoCode.lon).length == 0 ){
        // This should not happen in nonProd. We have a geocode, we should have a oneCallResponse
            console.warn('getOneCallResponseByGeoCode - No OneCallResponse for geoCode with zip '+ geoCode.zip );  //We should treat this as a 98888 with an alert
      }
      else{
        let ocr = ONECALLRESPONSES.find(ocr => ocr.lat == geoCode.lat && ocr.lon == geoCode.lon);
              console.log('getOneCallResponseByGeoCode looking good with a valid ocr and ocr?.data[0].weather[0].main = ' + ocr?.data[0].weather[0].main);
              let newBocrSig:WritableSignal<BobsCompositeOcr | undefined>  = signal(initialBobsCompositeOcr);
              newBocrSig.update(b => this.mergeJeoIntoBcor(b,geoCode));
              newBocrSig.update(b => this.mergeOcrIntoBcor(b,ocr  )); 
              newBocrSig.update(b => this.fixMainWeatherIconName(b));

              const newBocr = newBocrSig();
              if(newBocr){
                console.log('newBocr = '+newBocr.jeocode.zip+'|'+newBocr.oneCallResponse.lat+'|'+newBocr.dt);
              }
              //   console.log(' bobsCompositeOcrsSig before = ' + this.printBcors(this.bobsCompositeOcrsSig));
              //this.bobsCompositeOcrsSig.update(current => [...current,newBocrSig] ); 
              //this.bobsCompositeOcrsSig.update(ocrsSig => this.addNewToOcrsSig(ocrsSig,newBocrSig));
              const ocrsSig = this.bobsCompositeOcrsSig();
              if(ocrsSig) {
                let newList = this.addNewToOcrsSig(ocrsSig,newBocrSig);
                this.bobsCompositeOcrsSig.set(newList);
              }
              else{
                console.warn('strange this.bobsCompositeOcrsSig() is undefined here!');
              }

              setTimeout(()=>{ 
                //    console.log(' bobsCompositeOcrsSig after = ' + this.printBcors(this.bobsCompositeOcrsSig));
              },    2000);

              /*
              let foo =0;
              if(this.bobsCompositeOcrsSig().length > 1){
                const ocrs =this.bobsCompositeOcrsSig();
                if (ocrs && ocrs.length > 1){
                  const a = ocrs[0]();
                  if(a){
                    a.dt;
                    foo = a.dt;
                  }
                }
              }
              console.log('getOneCallResponseByGeoCode says: dt of the first element is ' + foo); 
              */
              this.startedBcocrSigD.set(true);
              this.jeocodeSigA.set(undefined);
              this.jeocodeSigB.set(undefined);
              //this.bobsCompositeOcrSig.set(undefined);
              this.oneCallResponseSig.set(undefined);
              localStorage.setItem('storedZipCode' + (geoCode.zip), geoCode.zip);
      }
    }
    //return oneCallResponseSig;
  }

  addNewToOcrsSig(bcorsSigs:WritableSignal<BobsCompositeOcr | undefined> []  , newBocrSig:WritableSignal<BobsCompositeOcr | undefined>): WritableSignal<BobsCompositeOcr | undefined> [] {
    let result = new Array<WritableSignal<BobsCompositeOcr| undefined>>;
    bcorsSigs.forEach(bcorsSig =>{
      result.push(bcorsSig);
    });
    result.push(newBocrSig);
    console.log('The new Result = '+this.printBcors(signal(result)));
    return result;
  }

  printBcors(bcorsSig:WritableSignal <WritableSignal<BobsCompositeOcr | undefined> [] > ):String{
    
    let result ='';
    const bcors = bcorsSig();
    if(bcors && bcors.length > 0 ){
      result = result + '['
      bcors.forEach(bcor => {
        if (bcor) {
          result = result + JSON.stringify(bcor) + ',';
        }
      }) ;      
    }
    if (result !='') result = result + ']'
    return result;
  }

  override getOneCallResponseByZip(zipcode: WritableSignal<String | undefined>): WritableSignal<WritableSignal<BobsCompositeOcr | undefined>[]> {
    this.atLeastOneRequest = true;
    this.doneWithPushSig.set(false);
    //this.bobsCompositeOcrSig.set(initialBobsCompositeOcr);
    console.log('---- nonprod getOneCallResponseByZip zipcode() = '+ zipcode());
    this.zipInProgressSig.set(zipcode());
    this.startedJoecodeSigA.set(true);
    //let result:WritableSignal<BobsCompositeOcr | undefined> = signal(undefined);
    this.getGeoCodeInfoFromZipWithKnownGeoCodes(zipcode);// this.getGeoCodeInfoFromZip(zipcode);
    
    return  this.bobsCompositeOcrsSig; // this.targetBobsCompositeOcrSig; //result;
  }


  override getGeoCodeInfoFromZipWithKnownGeoCodes(zipcode: WritableSignal<String | undefined>):void {//  WritableSignal<Jeocode | undefined> {
    console.log('--- non prod getGeoCodeInfoFromZipWithKnownGeoCodes running for zip = ' + zipcode());
      
      let jeo:Jeocode | undefined = KNOWNGEOCODES.find(kgc => kgc.zip == zipcode());
      if(jeo){
        console.log('--- non prod getGeoCodeInfoFromZipWithKnownGeoCodes worked and jeo.lat = ' + jeo.lat);
        this.jeocodeSigA.set(jeo);
        //result.set(jeo);
      }        
      else{
        let jeoSig = this.getGeoCodeInfoFromZipWoKnownGeoCodes(zipcode);
        const jeoB = jeoSig();
        if(jeoB && jeoB.zip == zipcode()){
          this.jeocodeSigA.set(jeoB); // still use the A sig no matter what
        }
      }  
      const joeKode = this.jeocodeSigA();
      if(joeKode){
          this.getOneCallResponseByGeoCode(this.jeocodeSigA);
      }  
      //TODO 98888 case put aleart here or else a console.warn statment about not being able to find a geoCode at all. 
  }

  override getGeoCodeInfoFromZipWoKnownGeoCodes(zipcode: WritableSignal<String | undefined>): WritableSignal<Jeocode | undefined> {
    // this will be much different in prod version!!
    console.log('Nonprodweather getGeoCodeInfoFromZipWoKnownGeoCodes going for '+ zipcode());
    let result: WritableSignal<Jeocode | undefined> = signal(undefined);
    
    const zc = zipcode();
    GEOCODESFORNONPROD.forEach(g => {
      if(g.zip == zc){
        result.set(g);
        console.log('found geo .')
      }
    });
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
   
}