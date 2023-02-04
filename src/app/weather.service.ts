import { Injectable } from '@angular/core';
import {Location} from './location';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {ForecastImpl} from './forecastImpl';
import {LocationImpl} from './locationImpl';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  location: Location;

  constructor(private http: HttpClient) {
  }


  getLocationFromService(zipcode: string): Observable<any>{
     return this.http.get('http://api.openweathermap.org/data/2.5/weather?zip=' + zipcode + ',us&units=imperial&appid=42b0cd87da0e1ba5a9580ed019511475');
  }

  getFiveDayForecastsFromService(lat: number, lon: number): Observable<any>{
    return this.http.get('http://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=minutely,hourly,alerts&appid=42b0cd87da0e1ba5a9580ed019511475');
  }

  getFiveDay(location: Location): void{
    this.getFiveDayForecastsFromService(location.lat, location.lon).subscribe({
      next: (data) => {
        location.forecasts = [];
        let counter = 0;
        data.daily.forEach(forecastDataFromService => {
            if ( counter < 5 ) {
              const forecast = new ForecastImpl();
              forecast.day = this.convertEpocToDayofWeek(forecastDataFromService.dt);
              forecast.description = forecastDataFromService.weather[0].main;
              forecast.max = forecastDataFromService.temp.max;
              forecast.min = forecastDataFromService.temp.min;
              forecast.forecastIcon = this.getIconFrom(forecastDataFromService.weather[0].main);
              location.forecasts.push(forecast);
              counter++;
            }
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
  }

  addNewLocation(zip: string, locations: Location[]): void{
    console.log('Weatherservice.addNewLocation going for new zip of: ' + zip);
    if (this.validateZip(zip)) {
      const location = new LocationImpl();
      this.getLocationFromService(zip)
        .subscribe({
          next: (data) => {
            console.log('Weatherservice.addNewLocation data = ' + JSON.stringify(data, null, 2));
            location.zip = zip;
            location.name = data.name;
            location.lon = data.coord.lon;
            location.lat = data.coord.lat;
            location.forecasts = [];
            location.forecasts.push(new ForecastImpl());
            location.forecasts[0].description = data.weather[0].main;

            location.forecasts[0].current = data.main.temp;
            location.forecasts[0].min = data.main.temp_min;
            location.forecasts[0].max = data.main.temp_max;
            location.forecasts[0].forecastIcon = this.getIconFrom(data.weather[0].main);

            locations.push(location);
            localStorage.setItem('storedZipCode' + (zip), zip);
          },
          error: (err) => {
            if (err.status === 404) {
              console.error('404 occurred getting ' + zip + ' from service.');
            }else {
              console.error('Some other error besides 404 occurred getting ' + zip + ' from service. error status = ' + err.status);
            }
            alert('Unable to find any weather data for ' + zip + '. Please try a different zip code. ');
          },
          complete: () => {
            console.log('subscription completed for ' + zip + ' and the number of locations is ' + locations.length);
          }
        });
    } else {
      alert('Zip ' +  zip + 'is not valid.');
    }
  }

  validateZip(unVaidatedZip: string): boolean {
    let result = false;
    result = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(unVaidatedZip);
    return result;
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
}
