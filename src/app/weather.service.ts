import { Injectable } from '@angular/core';
import {Location} from "./location";
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription} from "rxjs";
import {Forecast} from "./forecast";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  location: Location;
  locations: Location[];

  constructor(private http: HttpClient) {
    this.locations = [];
  }


  getLocationFromService(zipcode:string): Observable<any>{
     return this.http.get('http://api.openweathermap.org/data/2.5/weather?zip='+zipcode+',us&units=imperial&appid=42b0cd87da0e1ba5a9580ed019511475');
  }

  getFiveDayForecastsFromService(lat:number, lon: number): Observable<any>{
    return this.http.get('http://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=imperial&exclude=minutely,hourly,alerts&appid=42b0cd87da0e1ba5a9580ed019511475');
  }


  searchForZip(newZip:string, locations: Location [],subscription: Subscription): void {
    if (this.validateZip(newZip)) {
      let result = this.findLocationByZipcode(newZip, subscription)
      if (result != null) {
        localStorage.setItem('storedZipCode' + (newZip), newZip);
      } else {
        alert('Unable to find any weather data for ' + newZip);
      }
    }
    else {
      alert(newZip+ ' is not valid. Please enter only 5 numbers.')
    }
  }

  validateZip (unVaidatedZip:string): boolean {
    let result = false;
    result = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(unVaidatedZip);
    return result;
  }

  findLocationByZipcode(zipCode:string, subscription: Subscription):Location {

    let locations = this.locations;

    let found = false;
    let result: Location;
    if (null != locations &&  locations.length > 0 ){
      let index = locations.findIndex( d => (null != d && null !=d.zip && d.zip === zipCode) );
      if (index != -1){
        result = locations[index];
        found = true;
      }
    }
    if (!found){
      let location = new LocationImpl();
      this.callServiceUsingZip(location, zipCode, subscription);

      if ( null != location) {
        locations.push(location);
        result = location;
      }
    }
    return  result;
  }

  callServiceUsingZip(location: Location, zipcode: string, subscription: Subscription): void {

    subscription = this.getLocationFromService(zipcode).subscribe(data => {

        location.zip = zipcode;
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
      },
      err => {
        if (err.status == 404) {
          this.revertLocation(location, zipcode);
        }
      },
      () => {
        subscription.unsubscribe();
      }
    );
  }

  revertLocation( location: Location, zipcode: string): void {
    //Remove from locations array, remove from storage, and make null.

    let index = this.locations.findIndex(d => (d.zip == zipcode || null == d.zip));
    if ( index != -1){
      this.locations.splice(index,1);
    }
    for (let localStorageKey in localStorage) {
      if (localStorageKey.startsWith('storedZipCode')){
        if (localStorage.getItem(localStorageKey) == zipcode){
          localStorage.removeItem(localStorageKey);
        }
      }
    }
    location = null;

  }

  getIconFrom(input:string): string{
    if ( input == 'Clouds'){
      return 'clouds';
    }
    if ( input == 'Sunny'){
      return 'sun';
    }
    if ( input == 'Rain'){
      return 'rain';
    }
    if ( input == 'Snow'){
      return 'snow';
    }
    return 'sun'; //There is no icon for the "Clear" description.
  }

  searchForFiveDayForecast(location: Location, subscription: Subscription):  void {
    this.findFiveDayForecastsByZipcode(location, this.locations, subscription);
  }

  findFiveDayForecastsByZipcode(location: Location, locations: Location[], subscription: Subscription): void {
    let found = false;
    let result: Location;
    if (null != locations &&  locations.length > 0 ){
      let index = locations.findIndex( d => (d.zip == location.zip
        && null != d.forecasts
        && d.forecasts.length == 5));
      if (index != -1){
        result = locations[index];
        found = true;
      }
    }
    if (!found) {
      this.callServiceToUpdateForecastsUsingCoordinates(location, subscription);
    }
  }

  callServiceToUpdateForecastsUsingCoordinates( location: Location, subscription: Subscription): void {

    if (null != location.lat && null != location.lon) {

      subscription = this.getFiveDayForecastsFromService(location.lat, location.lon).subscribe(data => {
        location.forecasts = [];
        let counter= 0;

        data.daily.forEach(forecastDataFromService => {
          if ( counter < 5 ) {
            let forecast = new ForecastImpl();
            forecast.day = this.convertEpocToDayofWeek(forecastDataFromService.dt);
            forecast.description = forecastDataFromService.weather[0].main;
            forecast.max = forecastDataFromService.temp.max;
            forecast.min = forecastDataFromService.temp.min;
            forecast.forecastIcon = this.getIconFrom(forecastDataFromService.weather[0].main);
            location.forecasts.push(forecast);
            counter++;
          }
        });
      });
    }
  }

  convertEpocToDayofWeek(epoc:number):Date{
    let date = new Date(epoc*1000);
    return date;
  }

}


class LocationImpl implements Location {
  forecasts: Forecast[];
  name: string;
  zip: string;
  lat: number;
  lon: number;
};

class ForecastImpl implements Forecast{
  current: number;
  day: Date;
  description: string;
  forecastIcon: string;
  max: number;
  min: number;
}
