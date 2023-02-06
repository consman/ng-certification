import { Injectable } from '@angular/core';
import {Location} from './location';
import {HttpClient} from '@angular/common/http';
import {Observable, of, from} from 'rxjs';
import {filter} from 'rxjs/operators';
import {RAWFORECASTS, RAWLOCATIONS} from './mock-data';
import {WeatherService} from "./weather.service";


@Injectable({
  providedIn: 'root'
})
export class NonprodweatherService extends WeatherService {

  location: Location;

  constructor() {
    super();
    console.log('Going for NON-PROD weather service');
  }

  // TODO DO NOT USE any!!!
  getLocationFromService(zipcode: string): Observable<any>{
    console.log('Going for NON-PROD weather service getLocationFromService for zip: ' + zipcode);
    return from(RAWLOCATIONS).pipe(filter(loc => loc.zip === zipcode));
  }

  getFiveDayForecastsFromService(lat: number, lon: number): Observable<any>{
    return from(RAWFORECASTS).pipe(filter(forc => forc.lat === lat && forc.lon === lon));
  }

}
