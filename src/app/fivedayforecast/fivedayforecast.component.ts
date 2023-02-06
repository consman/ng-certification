import { Component, OnInit } from '@angular/core';
import {Location} from '../location';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {LocationImpl} from "../locationImpl";
import {Forecast} from "../forecast";
import {ForecastImpl} from "../forecastImpl";
import {WeatherService} from "../weather.service";

@Component({
  selector: 'app-fivedayforecast',
  templateUrl: './fivedayforecast.component.html',
  styleUrls: ['./fivedayforecast.component.css']
})
export class FivedayforecastComponent implements OnInit {

  location: Location;
  readyToCallService = false;
  zipParam: string;
  forecast: Forecast;

  constructor(route: ActivatedRoute, private router: Router, private weatherService: WeatherService) {
    console.log('Going for PROD weather service');
    if (route.snapshot === undefined){
      // TODO Very bad hack until I can find how to mock route snapshot params
      // see https://www.mycodingblog.com/post/mocking-out-angulars-activated-route-for-unit-tests/
      this.zipParam = '95630+Folsom+38.6709+-121.1529';
      console.error('ERROR! Unable to read the zipcode passed in the the location! Using Test Data');
    } else{
      this.zipParam = route.snapshot.paramMap.get('zipcode');
    }
    this.getDataFromZipParam(this.zipParam);
  }

  getDataFromZipParam(zp: string): void{

    if ( null != zp && zp !== '' && zp.length > 0) {
      const parts = zp.split('+');
      if ( null != parts && parts.length === 4){
        this.location = new LocationImpl();
        this.location.zip = parts[0];
        this.location.name = this.dashesToSpaces((parts[1]));
        this.location.lat = parseFloat(parts[2]);
        this.location.lon = parseFloat(parts[3]);
        this.readyToCallService = true;
      }
      else{
        console.error('Something is wrong! not enough parts! Only ' + parts.length );
      }
      if (this.readyToCallService){
        this.forecast = this.getFiveDay(this.location);
      }
    }
  }

  navigateBackToMain(): void {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }


  getFiveDay(location: Location): Forecast {
    let resultForecast: Forecast;
    this.weatherService.getFiveDayForecastsFromService(location.lat, location.lon).subscribe({
      next: (data) => {
        location.forecasts = [];
        // console.log('Weatherservice.Forecast data = ' + JSON.stringify(data, null, 2));
        let counter = 0;
        data.daily.forEach(forecastDataFromService => {
          const forecast = new ForecastImpl();
          if ( counter < 5 ) {
            forecast.day = this.convertEpocToDayofWeek(forecastDataFromService.dt);
            forecast.description = forecastDataFromService.weather[0].main;
            forecast.max = forecastDataFromService.temp.max;
            forecast.min = forecastDataFromService.temp.min;
            forecast.forecastIcon = this.getIconFrom(forecastDataFromService.weather[0].main);
            location.forecasts.push(forecast);
            counter++;
          }
          resultForecast = forecast;
        });
      },
      error: (err) => {
        if (err.status === 404) {
          console.error('404 occurred getting forecast from service.');
        }else {
          console.error('Some other error besides 404 occurred getting forceast from service. error status = ' + err.status);
        }
        alert('Unable to find forecast data for ' + location.lon + ' , ' + location.lat + '  . Please try a different location. ');
      },
      complete: () => {
        console.log('Five Day Forecast subscription completed for ' + location.name );
      }
    });
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
