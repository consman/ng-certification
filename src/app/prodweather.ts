import { Injectable, Service , WritableSignal, computed, effect, inject, signal} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Weather } from './weather';
import {HttpHeaders, httpResource, HttpResourceRequest} from '@angular/common/http';
import { BobsCompositeOcr, Jeocode, OneCallResponse } from './funTypes';
import { initialBobsCompositeOcr, initialGeoCode, KNOWNGEOCODES } from './refData';

declare const W_APP_ID: string;

@Injectable({ providedIn: 'root' })
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

}

  override getOneCallResponseByZip(zipSig: WritableSignal<String | undefined>): WritableSignal<WritableSignal<BobsCompositeOcr | undefined>[]> {
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
    //TODO make sure the result gets added to this list: 
    return this.bobsCompositeOcrsSig;
    
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
