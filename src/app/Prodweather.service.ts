import {Component, Injectable} from '@angular/core';
import {Location} from './location';
import { Forecast } from './forecast';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WeatherService} from './weather.service';

@Injectable({
  providedIn: 'root'
})
export class ProdweatherService extends WeatherService {

  constructor(private http: HttpClient) {
    super();
    console.log('Going for PROD weather service');
  }

  getLocationFromService(zipcode: string): Observable<Location> {
    console.log('Going for PROD weather service getLocationFromService and the zipcode is: ' + zipcode);
    console.log('http:' + this.http);
    return this.http.get<Location>('http://api.openweathermap.org/data/2.5/weather?zip=' + zipcode + ',us&units=imperial&appid=42b0cd87da0e1ba5a9580ed019511475');
  }

  getFiveDayForecastFromService(lat: number, lon: number): Observable<Forecast>{
   return this.http.get<Forecast>('http://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=minutely,hourly,alerts&appid=42b0cd87da0e1ba5a9580ed019511475');
  }

}

