import { Injectable } from '@angular/core';
import {Location} from './location';
import {HttpClient} from '@angular/common/http';
import {Observable, of, from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdweatherService {

  location: Location;

  constructor(private http: HttpClient) {
  }

  getLocationFromService(zipcode: string): Observable<any> {
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?zip=' + zipcode + ',us&units=imperial&appid=42b0cd87da0e1ba5a9580ed019511475');
  }
  getFiveDayForecastsFromService(lat: number, lon: number): Observable<any>{
   return this.http.get('http://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=minutely,hourly,alerts&appid=42b0cd87da0e1ba5a9580ed019511475');
  }

}
