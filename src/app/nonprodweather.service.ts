import { Injectable } from '@angular/core';

import {Location} from './location';
import { Forecast } from './forecast';
import {Observable, of, from, throwError} from 'rxjs';
import {filter} from 'rxjs/operators';
import {RAWFORECASTS, RAWLOCATIONS} from './mock-data';
import {WeatherService} from './weather.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NonprodweatherService extends WeatherService {

  constructor() {
    super();
   }
   
   getLocationFromService(zipcode: string): Observable<Location>{
       console.log('NON-PROD weather service getting locations for zip: ' + zipcode);
 
       if ( RAWLOCATIONS.filter(loc => loc.zip == zipcode).length == 0){
         console.log('NON-PROD weather service -- location not found for '+ zipcode);
         const error = new HttpErrorResponse({ status: 404 });
         return of(error) as any;
       }
       let result = from(RAWLOCATIONS).pipe(filter(loc => loc.zip === zipcode));
       
       return result;
   }
 
   getFiveDayForecastFromService(lat: number, lon: number): Observable<Forecast>{
     console.log('NON-PROD weather service getFiveDayForecastsFromService for lat: ' + lat);
     return from(RAWFORECASTS).pipe(filter(forc => forc.lat === lat && forc.lon === lon));
   }
 
}
