import { Injectable } from '@angular/core';
import {Location} from './location';
import { Forecast } from './forecast';
import {Observable, of, from, throwError} from 'rxjs';
import {filter, tap} from 'rxjs/operators';
import {RAWFORECASTS, RAWLOCATIONS} from './mock-data';
import {Weather} from './weather';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Nonprodweather extends Weather{
    constructor() { 
    super();
  }

  override getLocationFromService(zipcode: string): Observable<Location> {
    console.log('NON-PROD weather service getting location for zip: ' + zipcode);
 
       if ( RAWLOCATIONS.filter(loc => loc.zip == zipcode).length == 0){
         console.log('NON-PROD weather service -- location not found for '+ zipcode);
         const error = new HttpErrorResponse({ status: 404 });
         return of(error) as any;
       }
       else{
        console.log('NON-PROD weather service -- found at least one for '+ zipcode);
       }
       let result = from(RAWLOCATIONS).pipe(filter(loc => loc.zip === zipcode));//.pipe(tap(l=> {alert('In TAP');}));
       //alert('In NonprodweatherService! result = ' + result);
       
       return result;
  }
  override getFiveDayForecastFromService(lat: number, lon: number): Observable<Forecast> {
    console.log('NON-PROD weather service getFiveDayForecastsFromService for lat: ' + lat);
     return from(RAWFORECASTS).pipe(filter(forc => forc.lat === lat && forc.lon === lon));   
  }

}
