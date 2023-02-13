import { Injectable } from '@angular/core';
import {Location} from './location';
import { Forecast } from './forecast';
import {HttpClient} from '@angular/common/http';
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
    console.log('Created NON-PROD weather service');
  }

  // TODO DO NOT USE any!!!
  getLocationFromService(zipcode: string): Observable<Location>{
    if ( null != zipcode) {
      console.log('NON-PROD weather service getting locations for zip: ' + zipcode);
      return from(RAWLOCATIONS).pipe(filter(loc => loc.zip === zipcode));
    } else {
      console.log('NON-PROD weather service getting locations thinks zipcode is null.');
    }
    return null;
  }

  getFiveDayForecastFromService(lat: number, lon: number): Observable<Forecast>{
    console.log('NON-PROD weather service getFiveDayForecastsFromService for lat: ' + lat);
    return from(RAWFORECASTS).pipe(filter(forc => forc.lat === lat && forc.lon === lon));
  }

}
