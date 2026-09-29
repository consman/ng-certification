import { Service, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Forecast } from './forecast';
import {LocationT} from './location';

@Service()
export abstract class Weather {

    constructor() { }

  //abstract getLocationFromService(zipcode: string): Observable<LocationT>;
  //WritableSignal<LocationT | undefined> 
  abstract getLocationFromService(zipcode:WritableSignal<String | undefined>): WritableSignal<LocationT | undefined>; 
  abstract getFiveDayForecastFromService(lat: number, lon: number): Observable<Forecast>;
}
