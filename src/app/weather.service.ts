import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

export abstract class WeatherService{

  constructor() {
    console.log('In abstract weather service');
  }
  abstract getLocationFromService(zipcode: string): Observable<any>;
  abstract getFiveDayForecastsFromService(lat: number, lon: number): Observable<any>;
}
