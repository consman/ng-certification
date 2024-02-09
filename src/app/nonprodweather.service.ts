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
    //console.log('Created NON-PROD weather service');
  }

  getLocationFromService(zipcode: string): Observable<Location>{
      //console.log('NON-PROD weather service getting locations for zip: ' + zipcode);
      return from(RAWLOCATIONS).pipe(filter(loc => loc.zip === zipcode));
  }

  getFiveDayForecastFromService(lat: number, lon: number): Observable<Forecast>{
    console.log('NON-PROD weather service getFiveDayForecastsFromService for lat: ' + lat);
    return from(RAWFORECASTS).pipe(filter(forc => forc.lat === lat && forc.lon === lon));
  }

}
