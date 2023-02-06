import { Injectable } from '@angular/core';
import {Location} from './location';
import {HttpClient} from '@angular/common/http';
import {Observable, of, from} from 'rxjs';
import {filter} from 'rxjs/operators';
import {RAWFORECASTS, RAWLOCATIONS} from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class NonprodweatherService {

  location: Location;

  constructor(private http: HttpClient) {
    console.log('Going for NON-PROD weather service');
  }

  getLocationFromService(zipcode: string): Observable<any>{
    return from(RAWLOCATIONS).pipe(filter(loc => loc.zip === zipcode));
  }

  getFiveDayForecastsFromService(lat: number, lon: number): Observable<any>{
    return from(RAWFORECASTS).pipe(filter(forc => forc.lat === lat && forc.lon === lon));
  }

}
