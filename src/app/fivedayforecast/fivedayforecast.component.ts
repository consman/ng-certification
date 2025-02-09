import { Component, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { Forecast } from '../forecast';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from '../weather.service';
import {Location} from '../location';
import { LocationImpl } from '../locationImpl';
import { ForecastImpl } from '../forecastImpl';
import { AsyncPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-fivedayforecast',
  imports: [AsyncPipe,DatePipe],
  templateUrl: './fivedayforecast.component.html',
  styleUrl: '../app.component.css'
})
export class FivedayforecastComponent {

  weatherService = inject(WeatherService);
  location: Location;
  zipParam: string | null;
  obsForecast$: Observable<Forecast>;

  constructor(route: ActivatedRoute, private router: Router){ 
    this.zipParam = route.snapshot.paramMap.get('zipcode');
    this.location = new LocationImpl();
    this.location.forecasts = new Array<ForecastImpl>();
    this.getDataFromZipParam(this.zipParam);
    this.obsForecast$ = this.weatherService.getFiveDayForecastFromService(this.location.coord.lat, this.location.coord.lon);
  }

  getLocFromObservable(forecast: Forecast | null): Location {
    
    if(!this.location.forecasts){
      this.location.forecasts = new Array();
    }      
    if (!forecast || null == forecast) {
      forecast = new ForecastImpl();
    }
    this.location.forecasts[0] = forecast;
    return this.location;
  }

  getDataFromZipParam(zp: string | null): void{

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
