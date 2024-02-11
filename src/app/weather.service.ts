import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Location } from './location';
import { Forecast } from './forecast';

@Injectable()
export abstract class WeatherService {

  constructor() {}
  abstract getLocationFromService(zipcode: string): Observable<Location>;
  abstract getFiveDayForecastFromService(lat: number, lon: number): Observable<Forecast>;
}
