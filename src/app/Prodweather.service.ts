import { Injectable } from '@angular/core';
import {Location} from './location';
import {HttpClient} from '@angular/common/http';
import {Observable, of, from} from 'rxjs';
import {WeatherService} from './weather.service';


@Injectable({
  providedIn: 'root'
})
export class ProdweatherService extends WeatherService {

  location: Location;

  constructor(private http: HttpClient) {
    super();
    console.log('Going for PROD weather service');
  }

  getLocationFromService(zipcode: string): Observable<any> {
    console.log('Going for PROD weather service getLocationFromService and the zipcode is: ' + zipcode);
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?zip=' + zipcode + ',us&units=imperial&appid=42b0cd87da0e1ba5a9580ed019511475');
  }

  getFiveDayForecastsFromService(lat: number, lon: number): Observable<any>{
   return this.http.get('http://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=minutely,hourly,alerts&appid=42b0cd87da0e1ba5a9580ed019511475');
  }

}
