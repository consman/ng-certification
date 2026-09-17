import { Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Forecast } from './forecast';
import {LocationT} from './location';

@Service()
export abstract class Weather {

    constructor() { }

  abstract getLocationFromService(zipcode: string): Observable<LocationT>;
  abstract getFiveDayForecastFromService(lat: number, lon: number): Observable<Forecast>;
}
