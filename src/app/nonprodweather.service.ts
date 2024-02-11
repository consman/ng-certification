import { Injectable } from '@angular/core';
import {Location} from './location';
import { Forecast } from './forecast';
import {Observable, of, from} from 'rxjs';
import {filter} from 'rxjs/operators';
import {RAWFORECASTS, RAWLOCATIONS} from './mock-data';
import {WeatherService} from './weather.service';


@Injectable({
  providedIn: 'root'
})
export class NonprodweatherService extends WeatherService {

  constructor() {
    super();
  }

  getLocationFromService(zipcode: string): Observable<Location>{
      return from(RAWLOCATIONS).pipe(filter(loc => loc.zip === zipcode));
  }

  getFiveDayForecastFromService(lat: number, lon: number): Observable<Forecast>{
    return from(RAWFORECASTS).pipe(filter(forc => forc.lat === lat && forc.lon === lon));
  }

}
