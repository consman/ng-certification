import { Service , WritableSignal, computed, effect, inject, signal} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {LocationT} from './location';

import {Observable} from 'rxjs';
import { Forecast } from './forecast';
import { Weather } from './weather';
import {HttpHeaders, httpResource, HttpResourceRequest} from '@angular/common/http';
import { BobsCompositeOcr, Jeocode, OneCallResponse } from './funTypes';

declare const W_APP_ID: string;

@Service()
export class Prodweather extends Weather {
  
constructor(){
  super();

  effect(() => { 
     const notFound = this.isNotFound();
     if(notFound){
       console.log ('eff 003 in Prodweather - Not Found.');
       alert('The zip code, ' + this.targZipForLocationSig() + ', is formatted OK, but no data is returned.');
     }
  });  
}

  http = inject (HttpClient);
  wAppId = W_APP_ID;
  headers = new HttpHeaders();
  startedSig: WritableSignal<boolean> = signal( false);
  
  dummyForOneCallSig:WritableSignal<String | undefined>= signal(new Date().getTime()+'');

  private targZipForLocationSig = signal <String | undefined>('');
  private targJeoForOneCallSig = signal <Jeocode | undefined>(undefined);
  oneCallResponseResource = httpResource<OneCallResponse | undefined>(()=>{
    const targJeoForOneCall = this.targJeoForOneCallSig();
    const dummy = this.dummyForOneCallSig();
    if(!targJeoForOneCall){return undefined;} else {
      console.log('Inside the oneCallResponseResource and trying for this.targJeoForOneCallSig()?.name = ' + this.targJeoForOneCallSig()?.name);
      this.headers = new HttpHeaders();
      this.headers.append("Content-Type", "application/json");
    }
    const request: HttpResourceRequest = {
      //url:'https://api.openweathermap.org/data/2.5/weather?zip=' + targZipForLocation + ',us&units=imperial&appid='+this.wAppId+ '&dummy='+dummy,
      url:'https://api.openweathermap.org/data/4.0/onecall/timeline/1day?lat='+targJeoForOneCall.lat+'&lon='+targJeoForOneCall.lon+'&appid='+this.wAppId+ '&dummy='+dummy,
      method: 'GET',
      headers: this.headers
    }
    return request;
  });

/*
  private targZipForLocationSig = signal <String | undefined>('');
  locationResource = httpResource<LocationT | undefined>(() => {
    const targZipForLocation = this.targZipForLocationSig();
    const dummy = this.dummyForLocationSig();
    if(!targZipForLocation) {return undefined;} else {
      //console.log('Inside the locationResource and trying for this.targZipForLocationSig() = ' + this.targZipForLocationSig());
      this.headers = new HttpHeaders();
      this.headers.append("Content-Type", "application/json");
    }
    const request: HttpResourceRequest = {
      url:'https://api.openweathermap.org/data/2.5/weather?zip=' + targZipForLocation + ',us&units=imperial&appid='+this.wAppId+ '&dummy='+dummy,
      method: 'GET',
      headers: this.headers
    }
    return request;

  });  
*/

  isNotFound = computed(() => {
    const errr = this.oneCallResponseResource.error();
    if(this.startedSig()) console.log('error found inside computed logic....');
    return  errr instanceof HttpErrorResponse && errr.status == 404;
  });

  override getOneCallResponseByZip(zipSig: WritableSignal<String | undefined>): WritableSignal<BobsCompositeOcr | undefined> {
    let result: WritableSignal<BobsCompositeOcr | undefined> = signal(undefined);
    let bcocr: BobsCompositeOcr | undefined = undefined;

    this.targJeoForOneCallSig.set(super.getGeoCodeInfoFromZip(zipSig)());
    const targJeoForOneCall = this.targJeoForOneCallSig();
    
    if (targJeoForOneCall && targJeoForOneCall.lat && targJeoForOneCall.lat!= 0) {
      this.startedSig.set(true);
    }
    this.dummyForOneCallSig = signal(new Date().getTime()+''); 
    let ocr = this.oneCallResponseResource.value;
    let ocrc = ocr();
    if(targJeoForOneCall  && ocrc){
      bcocr = {
        jeocode: targJeoForOneCall,
        oneCallResponse: ocrc,
        dt: new Date().getTime()        
      }
    };
    result = signal(bcocr);
    this.addOneCallResponse(result);
    return result;
  }

/*
  override getLocationFromService(zipSig:WritableSignal<String | undefined>):WritableSignal<LocationT | undefined>{
    if (this.targZipForLocationSig() ) this.startedSig.set(true);
    this.dummyForLocationSig = signal(new Date().getTime()+''); //().set(new Date().getTime()+'');
    this.targZipForLocationSig.set(zipSig());
    let result = this.locationResource.value;
    
    //console.log(' prod getLocationFromService called and result()?.sys.id = ' + result()?.sys.id + ' and zipSig() = '+zipSig());
    return result;
  }
*/
    
/*
  //New OneCall Service:
  override getFiveDayForecastFromService(lat: number, lon: number): Observable<Forecast> {
    return this.http.get<Forecast>('https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=minutely,hourly,alerts&appid='+this.wAppId);
  }
*/
}
