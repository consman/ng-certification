import { Service , WritableSignal, inject, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  http = inject (HttpClient);
  wAppId = W_APP_ID;
  headers = new HttpHeaders();


  dummyForLocationSig:WritableSignal<String | undefined>= signal(new Date().getTime()+'');

  private targZipForLocationSig = signal <String | undefined>('');
  locationResource = httpResource<LocationT | undefined>(() => {
    const targZipForLocation = this.targZipForLocationSig();
    const dummy = this.dummyForLocationSig();
    if(!targZipForLocation) {return undefined;} else {
      this.headers = new HttpHeaders();
      this.headers.append("Content-Type", "application/json");
    }
    const request: HttpResourceRequest = {
      url:'https://api.openweathermap.org/data/2.5/weather?zip=' + targZipForLocation + ',us&units=imperial&appid='+this.wAppId+ '/?dummy='+dummy,
      method: 'GET',
      headers: this.headers
    }
    return request;

  });  

  getLocationFromHtrService(zipSig:WritableSignal<String | undefined>):WritableSignal<LocationT | undefined>{
    this.dummyForLocationSig = signal(new Date().getTime()+''); //().set(new Date().getTime()+'');
    this.targZipForLocationSig.set(zipSig());
    let result = this.locationResource.value;
    return result;
  }

    
  override getLocationFromService(zipcode: string): Observable<LocationT> {
    console.log('Going for PROD weather service getLocationFromService and the zipcode is: ' + zipcode);   
    // TODO update to use the GeoCodeApi to get the lonitude/lat from the zip code, the the onecall should have everything.
    //  https://api.openweathermap.org/geo/1.0/zip?zip=95630,US&zappid=
    // {"zip":"95630","name":"Folsom","lat":38.6709,"lon":-121.1529,"country":"US"}
    return this.http.get<LocationT>('https://api.openweathermap.org/data/2.5/weather?zip=' + zipcode + ',us&units=imperial&appid='+this.wAppId);
  }
  
  //New OneCall Service:
  override getFiveDayForecastFromService(lat: number, lon: number): Observable<Forecast> {
    return this.http.get<Forecast>('https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=minutely,hourly,alerts&appid='+this.wAppId);
  }

}
