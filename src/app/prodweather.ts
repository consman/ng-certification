import { Service , WritableSignal, computed, effect, inject, signal} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Weather } from './weather';
import {HttpHeaders, httpResource, HttpResourceRequest} from '@angular/common/http';
import { BobsCompositeOcr, Jeocode, OneCallResponse } from './funTypes';
import { initialBobsCompositeOcr, initialGeoCode, KNOWNGEOCODES } from './refData';

declare const W_APP_ID: string;

@Service()
export class Prodweather extends Weather {
  
  override getGeoCodeInfoFromZipWithKnownGeoCodes(zipcode: WritableSignal<String | undefined>): void {
    throw new Error('Method not implemented.');
  }

  /*
  override getGeoCodeInfoFromZipWithKnownGeoCodes(zipcode: WritableSignal<String | undefined>): WritableSignal<Jeocode | undefined> {    
    console.log('--- getGeoCodeInfoFromZip running for zip = ' + zipcode());
      let result: WritableSignal<Jeocode | undefined> = (signal (undefined));
      let jeo = KNOWNGEOCODES.find(kgc => kgc.zip == zipcode());
      if(jeo){
        result.set(jeo);
      }      
      return result;
  }
*/

  wAppId = W_APP_ID;
  headers = new HttpHeaders();
  startedSig: WritableSignal<boolean> = signal( false);
  startedForGeoSig: WritableSignal<boolean> = signal( false);
  
  dummyForOneCallSig:WritableSignal<String | undefined>= signal(new Date().getTime()+'');
  dummyForGeoCodeSig:WritableSignal<String | undefined>= signal(new Date().getTime()+'');
  bcocr: BobsCompositeOcr | undefined = undefined;
  bcocrResultSig: WritableSignal<BobsCompositeOcr | undefined> = signal(undefined);
  oneCallResponse: WritableSignal<OneCallResponse | undefined> = signal(undefined);
  eff005Done:WritableSignal<boolean> = signal( true);
  zipInProgressSig: WritableSignal<String | undefined> = signal(undefined);
  queuedZips:String [] = [];
  currJeoCode:Jeocode = initialGeoCode;

constructor(){
  super();

  effect(() => { //004 
    const targJeoForOneCall = this.targJeoForOneCallSig();
    const startedForGeo = this.startedForGeoSig();
    if(startedForGeo){
      if(targJeoForOneCall){
        console.log('004 targJeoForOneCall = ' + JSON.stringify(targJeoForOneCall));
        this.currJeoCode = targJeoForOneCall;
        this.startedSig.set(true);   
        this.dummyForOneCallSig.set(new Date().getTime()+'');
        //this.oneCallResponse = this.oneCallResource.value;   
        this.startedForGeoSig.set(false);  
      }
      else {
        console.log('004 targJeoForOneCall = undefined');
      }
    }
  });


  effect(() => { //005
    const oneCallResp = this.oneCallResponse();
    const started = this.startedForGeoSig();
    const targJeoForOneCall = this.targJeoForOneCallSig();
    const zip = this.zipInProgressSig();

    if( started && oneCallResp && targJeoForOneCall){
      if (oneCallResp.lat == this.targJeoForOneCallSig()?.lat && targJeoForOneCall.zip ==zip){
        this.bcocr = initialBobsCompositeOcr;
        this.bcocr.oneCallResponse = oneCallResp;
        this.bcocr.jeocode = targJeoForOneCall;
        this.bcocr.dt = new Date().getTime();
        this.bcocrResultSig.set(this.bcocr);
        this.bobsCompositeOcrsSig().push(this.bcocrResultSig);
      }
    }
  });

  effect(() => { //999 
    const targJeoForOneCall = this.targJeoForOneCallSig();
    const started = this.startedForGeoSig();
    if (started){
      console.log('999 targJeoForOneCall changed again -  targJeoForOneCall = ' + JSON.stringify(targJeoForOneCall));
    }
  });
}

  override getOneCallResponseByZip(zipSig: WritableSignal<String | undefined>): WritableSignal<BobsCompositeOcr | undefined> {
    let result:WritableSignal<BobsCompositeOcr | undefined> = signal(undefined);

    //let bcocr: BobsCompositeOcr | undefined = undefined;
    this.bcocrResultSig.set(undefined);
    //this.targJeoForOneCallSig.set(undefined);
    //this.oneCallResource.set(undefined);
    this.bcocr = initialBobsCompositeOcr;
    this.bcocrResultSig.set(undefined);
    this.queuedZips = [];
    if (this.eff005Done()) {
      if(!this.startedForGeoSig()){
        if(!this.zipInProgressSig()){
          this.eff005Done.set(false);
          this.startedForGeoSig.set(true);
          this.zipInProgressSig.set(zipSig());
          //this.targJeoForOneCallSig = super.getGeoCodeInfoFromZip(zipSig); //TODO work on this. 
          result = this.bcocrResultSig;
        }
        else {
          console.log('zipInProgressSig is not undefined!');
        }  
      }
      else {
        console.log('startedForGeoSig is already true!');
      }  
    }
    else {
      console.log('eff005Done is already false!');
    }

    return result;
    
   }


  private targJeoForOneCallSig = signal <Jeocode | undefined>(undefined);
  oneCallResource = httpResource<OneCallResponse | undefined>(()=>{
    const targJeoForOneCall = this.targJeoForOneCallSig();
    const dummy = this.dummyForOneCallSig();
    const started = this.startedSig();
    if(!targJeoForOneCall || !started || !dummy){
      console.log('inside oneCallResource but targJeoForOneCall is undefined or not started yet targJeoForOneCall = '+ targJeoForOneCall+'  started = '+ started);
      return undefined;
    } else {
      console.log('Inside the oneCallResponseResource and trying for this.targJeoForOneCallSig()?.name = ' + this.targJeoForOneCallSig()?.name);
      this.headers = new HttpHeaders();
      this.headers.append("Content-Type", "application/json");
    }
    const request: HttpResourceRequest = {
      //url:'https://api.openweathermap.org/data/2.5/weather?zip=' + targZipForGeoCode + ',us&units=imperial&appid='+this.wAppId+ '&dummy='+dummy,
      url:'https://api.openweathermap.org/data/4.0/onecall/timeline/1day?lat='+targJeoForOneCall.lat+'&lon='+targJeoForOneCall.lon+'&appid='+this.wAppId+ '&dummy='+dummy,
      method: 'GET',
      headers: this.headers
    }
    return request;
  });

  isNotFound = computed(() => { 
    const errr = this.geoCodeResource.error(); //this.oneCallResource.error();
    //const targJeo = this.targJeoForOneCallSig();
    //const startedJeo = this.startedForGeoSig();
    let result = errr instanceof HttpErrorResponse && errr.status == 404;
    if(result){// && startedJeo){// && targJeo && targJeo.zip.length == 5 ) {
      console.log('inside computed logic for isNotFound ');// .... and targJeo. = ' + JSON.stringify(targJeo));
    }    
    return result;
  });

  private targZipForGeoCodeSig = signal <String | undefined>('');
  geoCodeResource = httpResource<Jeocode | undefined>(() => {
    const targZipForGeoCode = this.targZipForGeoCodeSig();
    const dummy = this.dummyForGeoCodeSig();
    const startedForGeo = this.startedForGeoSig();
    if(!targZipForGeoCode || !startedForGeo) {return undefined;} else {
      console.log('Inside the geoCodeResource and trying for startedForGeo = '+startedForGeo+' and this.targZipForGeoCodeSig() = ' + JSON.stringify( this.targZipForGeoCodeSig()));
      this.headers = new HttpHeaders();
      this.headers.append("Content-Type", "application/json");
    }
    const request: HttpResourceRequest = {
      url:'https://api.openweathermap.org/geo/1.0/zip?zip=' + targZipForGeoCode + ',us&units=imperial&appid='+this.wAppId+ '&dummy='+dummy,
      method: 'GET',
      headers: this.headers
    }
    return request;

  });  

  //use this if the zip is not in the list of known geo codes in refData.ts 
  override getGeoCodeInfoFromZipWoKnownGeoCodes(zipSig:WritableSignal<String | undefined>):WritableSignal<Jeocode | undefined>{
    this.targZipForGeoCodeSig.set(zipSig());
    if (this.targZipForGeoCodeSig() ) this.startedForGeoSig.set(true);
    this.dummyForGeoCodeSig = signal(new Date().getTime()+''); 
      
    let result = this.geoCodeResource.value;      
      //console.log(' prod getLocationFromService called and result()?.sys.id = ' + result()?.sys.id + ' and zipSig() = '+zipSig());
    return result;
  }

}

/*

  effect(() => { 
     const notFound = this.isNotFound();
     if(notFound && this.startedForGeoSig()){
       console.log ('eff 003 in Prodweather - Not Found.');
       alert('The zip code, ' + this.targZipForGeoCodeSig() + ', is formatted OK, but no data is returned.prod');
       //
       this.startedForGeoSig.set(false);
     }
  });  

  effect(() =>{ //004 wait for response from goeCode service, then run main part of onecall service
    const targJeoForOneCall = this.targJeoForOneCallSig();
    const startedForGeo = this.startedForGeoSig();
    const zipInProgress = this.zipInProgressSig();
    if(targJeoForOneCall && zipInProgress && zipInProgress.length == 5 && targJeoForOneCall.zip.length == 5 && zipInProgress == targJeoForOneCall.zip){
      if(startedForGeo && targJeoForOneCall && targJeoForOneCall.zip.length == 5){
        console.log ('eff 004 in Prodweather and got Jeocode with a lat of '+targJeoForOneCall.zip+' and starting other call');

        //these next 2 should kick off the next resource
        this.startedForGeoSig.set(false);
        this.startedSig.set(true); 
        this.dummyForOneCallSig = signal(new Date().getTime()+''); 

        this.oneCallResponse = this.oneCallResource.value;
      }
    }
    else {
      let jtfocz = 'undefined';
      if (targJeoForOneCall){
        jtfocz = targJeoForOneCall.zip;
        if( jtfocz.length == 5){
          this.queuedZips.push(jtfocz);
        }
      }
      console.log('Bypassing eff 004 - zip not set up zipInProgress: '+ zipInProgress + ' and targJeoForOneCall.zip: '+ jtfocz);
      
    }
  });

  effect(() =>{ //005 Handle response from main resource
    const targJeoForOneCall = this.targJeoForOneCallSig();
    const started = this.startedSig();
    const ocr = this.oneCallResponse();
    const zipInProgress = this.zipInProgressSig();
    console.log('ocr = ' + JSON.stringify(ocr));
    if(targJeoForOneCall && zipInProgress && zipInProgress.length == 5 && targJeoForOneCall.zip.length == 5 && zipInProgress == targJeoForOneCall.zip){
      if(started && ocr){
        if(targJeoForOneCall  && ocr){
          console.log('in eff 005 and ocr.lat ' + ocr.lat);
          this.bcocr = {
            jeocode: targJeoForOneCall,
            oneCallResponse: ocr,
            dt: new Date().getTime()        
          }
        };
        this.bcocrResultSig.set(this.bcocr);

        let ind = -1;
        ind = this.bobsCompositeOcrsSig().findIndex(bcoA => { 
            const bcoAc = bcoA();
            //const bcoc = this.bcocrResultSig();
            bcoAc && this.bcocr && bcoAc.jeocode.lat == this.bcocr.jeocode.lat;        
        });

        if(ind == -1){
          this.bobsCompositeOcrsSig().push(this.bcocrResultSig);
          console.log('eff 005 and just pushed this.bcocr?.jeocode.zip) = '+this.bcocr?.jeocode.zip);
        }
        
      }
    }  
    else {
      let jtfocz = 'undefined';
      if (targJeoForOneCall){
        jtfocz = targJeoForOneCall.zip;
        if( jtfocz.length == 5){
          this.queuedZips.push(jtfocz);
        }
      }
      console.log('Bypassing eff 005 - zip not set up zipInProgress: '+ zipInProgress + ' and targJeoForOneCall.zip: '+ jtfocz);
      
    }
        this.eff005Done.set(true);
        this.startedSig.set(false);
        this.zipInProgressSig.set(undefined);
        this.startedForGeoSig.set(false);
        this.targJeoForOneCallSig.set(undefined);


  });
*/