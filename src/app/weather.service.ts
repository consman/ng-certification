import {Observable} from "rxjs";

export abstract class WeatherService{

  constructor() {
    console.log('In abstract weather service');
  }
  // TODO DO NOT USE any!!!
  abstract getLocationFromService(zipcode: string): Observable<any>;
  abstract getFiveDayForecastsFromService(lat: number, lon: number): Observable<any>;
}
