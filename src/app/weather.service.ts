import { Injectable } from '@angular/core';
import {Location} from "./location";
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {WeatherServiceAdapter} from "./weatherServiceAdapter";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  location: Location;
  locations: Location[];
  weatherServiceAdapter: WeatherServiceAdapter;

  constructor(private http: HttpClient) {
    this.locations = [];
    this.weatherServiceAdapter = new WeatherServiceAdapter();
    this.weatherServiceAdapter.setWeatherService(this);
  }

  public getWeatherServiceAdapter(): WeatherServiceAdapter {
    return this.weatherServiceAdapter;
  }

  getLocationFromService(zipcode:string): Observable<any>{
     return this.http.get('http://api.openweathermap.org/data/2.5/weather?zip='+zipcode+',us&units=imperial&appid=42b0cd87da0e1ba5a9580ed019511475');
  }

  getFiveDayForecastsFromService(lat:number, lon: number): Observable<any>{
    return this.http.get('http://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=imperial&exclude=minutely,hourly,alerts&appid=42b0cd87da0e1ba5a9580ed019511475');
  }


}
