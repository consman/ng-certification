import { Injectable, Service , WritableSignal, computed, effect, inject, signal} from '@angular/core';


import { Weather } from './weather';
import {HttpHeaders, httpResource, HttpResourceRequest} from '@angular/common/http';
import { Jeocode, Lokation, OneCallResponse } from './funTypes';

declare const W_APP_ID: string;

@Injectable({ providedIn: 'root' })
export class Prodweather extends Weather {

  wAppId = W_APP_ID;
  headers = new HttpHeaders();
  startedOneCallSig: WritableSignal<boolean> = signal( false);
  startedForGeoSig: WritableSignal<boolean> = signal( false);

  dummyForOneCallSig:WritableSignal<String | undefined>= signal(new Date().getTime()+'');
  dummyForGeoCodeSig:WritableSignal<String | undefined>= signal(new Date().getTime()+'');

  private targJeoForOneCallSig = signal <Jeocode | undefined>(undefined);
  oneCallResource = httpResource<OneCallResponse | undefined>(()=>{
    const targJeoForOneCall = this.targJeoForOneCallSig();
    const dummy = this.dummyForOneCallSig();
    const started = this.startedOneCallSig();
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
      url:'https://api.openweathermap.org/data/4.0/onecall/timeline/1day?lat='+targJeoForOneCall.lat+'&lon='+targJeoForOneCall.lon+'&units=imperial&exclude=minutely,hourly,alerts&appid='+this.wAppId+ '&dummy='+dummy,
      method: 'GET',
      headers: this.headers
    }
    return request;
  });

  override getOneCallResponseByJeoCode(joeCode: Jeocode): WritableSignal<OneCallResponse | undefined> {
    if (joeCode && joeCode.zip && joeCode.zip.length == 5){
      this.targJeoForOneCallSig.set(joeCode);
      this.startedOneCallSig.set(true);
      this.dummyForOneCallSig.set(new Date().getTime()+'');

      let resultSig: WritableSignal<OneCallResponse | undefined> = this.oneCallResource.value;
      const result = resultSig();
      //if(result) this.handleNewLokationFromNewOcr(result);
      this.inProgressOneCallResponseSig = resultSig;
    }
    return this.inProgressOneCallResponseSig;
  }

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

  override getGeoCodeInfoFromZipWoKnownGeoCodes(zipSig: WritableSignal<String | undefined>): WritableSignal<Jeocode | undefined> {
    this.targZipForGeoCodeSig.set(zipSig());
    if (this.targZipForGeoCodeSig() ) this.startedForGeoSig.set(true);
    this.dummyForGeoCodeSig = signal(new Date().getTime()+''); 
      
    let result = this.geoCodeResource.value;      
      //console.log(' prod getLocationFromService called and result()?.sys.id = ' + result()?.sys.id + ' and zipSig() = '+zipSig());
    return result;
  }
  

}
