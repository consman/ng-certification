import { Component, OnInit } from '@angular/core';
import {Location} from '../location';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {LocationImpl} from '../locationImpl';
import {Daily, Forecast, Weather2} from '../forecast';
import {DailyImpl, ForecastImpl, TempImpl, Weather2Impl} from '../ForecastImpl';
import {WeatherService} from '../weather.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-fivedayforecast',
  templateUrl: './fivedayforecast.component.html',
  styleUrls: ['./fivedayforecast.component.css']
})
export class FivedayforecastComponent implements OnInit {

  location: Location;
  zipParam: string;
  obsForecast$: Observable<ForecastImpl>;

  constructor(route: ActivatedRoute, private router: Router, private weatherService: WeatherService) {
    this.zipParam = route.snapshot.paramMap.get('zipcode');
    this.location = new LocationImpl();
    this.location.forecasts = new Array<ForecastImpl>();
    console.log(' The zip  param is: ' + this.zipParam);
    this.getDataFromZipParam(this.zipParam);
    this.obsForecast$ = this.weatherService.getFiveDayForecastsFromService(this.location.coord.lat, this.location.coord.lon);
  }

  getLocFromObservable(forecast: Forecast): Location {
    if (forecast) {
      this.location.forecasts[0] = forecast;
    }
    return this.location;
  }

  getDataFromZipParam(zp: string): void{

    if ( null != zp && zp !== '' && zp.length > 0) {
      const parts = zp.split('+');
      if ( null != parts && parts.length === 4){
        // this.location = new LocationImpl();
        this.location.zip = parts[0];
        this.location.name = this.dashesToSpaces((parts[1]));
        this.location.coord.lat = parseFloat(parts[2]);
        this.location.coord.lon = parseFloat(parts[3]);

      }
      else{
        console.error('Something is wrong! not enough parts! Only ' + parts.length );
      }
    }
  }

  navigateBackToMain(): void {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }

  getFiveDay(location: Location): Forecast {
    // tslint:disable-next-line:prefer-const
    let resultForecast: ForecastImpl;
    console.log('003 Done with method  and days of week are ' );
    return resultForecast;
  }

  getIconFrom(input: string): string{
    if ( input === 'Clouds'){
      return 'clouds';
    }
    if ( input === 'Sunny'){
      return 'sun';
    }
    if ( input === 'Rain'){
      return 'rain';
    }
    if ( input === 'Snow'){
      return 'snow';
    }
    return 'sun';
  }

  convertEpocToDayofWeek(epoc: number ): Date{
    const date = new Date(epoc * 1000);
    return date;
  }

  dashesToSpaces(locationNameWithDashes: string): string {
    let result = '';
    result = result = locationNameWithDashes.replace('-', ' ');
    return result;
  }

}
