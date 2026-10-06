import { Service , WritableSignal, effect, inject, signal} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {LocationT} from './location';

import {Observable} from 'rxjs';
import { Forecast } from './forecast';
import { Weather } from './weather';
import {HttpHeaders, httpResource, HttpResourceRequest} from '@angular/common/http';

declare const W_APP_ID: string;

@Service()
export class Prodweather extends Weather {
/*
    constructor(private http: HttpClient) { 
    super();
  }
*/

constructor(){
  super();

  effect(() => { //this.locationResource.value;
    const loc = this.locationResource.value();
    //console.log('effect in prod weather running and loc()?.sys.id =  ' + loc()?.sys.id );
    if(loc) console.log('The JSON result in prod weather service is: '+ JSON.stringify(loc));
  });

  effect(() => { //this.locationResource.value;
    const error = this.locationResource.error();
    const started= this.startedSig();
    if(started){
      console.log('Going for eff 002 in Prodweather and error?.message = ' + error?.message + 'error?.name = '+ error?.name);
      if (error instanceof HttpErrorResponse && error.status === 404) {
        alert('The zip code, ' + this.targZipForLocationSig() + ', is formatted OK, but no data is returned.'); 
      }
      if(error){
        console.log ('eff 002 in Prodweather and  error is here but not an instanceof HttpErrorResponse .  error = ' + JSON.stringify( error));
      }
      else{
        console.log ('eff 002 in Prodweather and  error is undefined ');
      }

    }
  });  
}

  http = inject (HttpClient);
  wAppId = W_APP_ID;
  headers = new HttpHeaders();
  startedSig: WritableSignal<boolean> = signal( false);



  dummyForLocationSig:WritableSignal<String | undefined>= signal(new Date().getTime()+'');

  private targZipForLocationSig = signal <String | undefined>('');
  locationResource = httpResource<LocationT | undefined>(() => {
    const targZipForLocation = this.targZipForLocationSig();
    const dummy = this.dummyForLocationSig();
    if(!targZipForLocation) {return undefined;} else {
      console.log('Inside the locationResource and trying for this.targZipForLocationSig() = ' + this.targZipForLocationSig());
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

  override getLocationFromService(zipSig:WritableSignal<String | undefined>):WritableSignal<LocationT | undefined>{
    this.startedSig.set(true);
    this.dummyForLocationSig = signal(new Date().getTime()+''); //().set(new Date().getTime()+'');
    this.targZipForLocationSig.set(zipSig());
    let result = this.locationResource.value;
/*    
    const zipp = zipSig();
    if(zipp){
      result.update(loc => { if(loc) loc.zip = zipp+''});
    }
*/      
    console.log(' prod getLocationFromService called and result()?.sys.id = ' + result()?.sys.id + ' and zipSig() = '+zipSig());
    return result;
  }

    /*
  override getLocationFromService(zipcode: string): Observable<LocationT> {
    console.log('Going for PROD weather service getLocationFromService and the zipcode is: ' + zipcode);   
    // TODO update to use the GeoCodeApi to get the lonitude/lat from the zip code, the the onecall should have everything.
    //  https://api.openweathermap.org/geo/1.0/zip?zip=95630,US&zappid=
    // {"zip":"95630","name":"Folsom","lat":38.6709,"lon":-121.1529,"country":"US"}
    return this.http.get<LocationT>('https://api.openweathermap.org/data/2.5/weather?zip=' + zipcode + ',us&units=imperial&appid='+this.wAppId);
  }
*/

  //New OneCall Service:
  override getFiveDayForecastFromService(lat: number, lon: number): Observable<Forecast> {
    return this.http.get<Forecast>('https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=minutely,hourly,alerts&appid='+this.wAppId);
  }

}
