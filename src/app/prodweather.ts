import { HttpClient } from '@angular/common/http';
import {Location} from './location';
import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';
import { Forecast } from './forecast';
import { Weather } from './weather';

@Injectable({
  providedIn: 'root',
})
export class Prodweather extends Weather {
  
  constructor(private http: HttpClient) { 
    super();
  }

  override getLocationFromService(zipcode: string): Observable<Location> {
    console.log('Going for PROD weather service getLocationFromService and the zipcode is: ' + zipcode);   
    // TODO update to use the GeoCodeApi to get the lonitude/lat from the zip code, the the onecall should have everything.
    //  https://api.openweathermap.org/geo/1.0/zip?zip=95630,US&zappid=
    // {"zip":"95630","name":"Folsom","lat":38.6709,"lon":-121.1529,"country":"US"}
    return this.http.get<Location>('https://api.openweathermap.org/data/2.5/weather?zip=' + zipcode + ',us&units=imperial&appid=');
  }
  
  //New OneCall Service:
  override getFiveDayForecastFromService(lat: number, lon: number): Observable<Forecast> {
    return this.http.get<Forecast>('https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=minutely,hourly,alerts&appid=');
  }

}
