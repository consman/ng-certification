import { Component, OnInit } from '@angular/core';
import {Location} from '../location';
import {LocationImpl} from "../locationImpl";
import {ForecastImpl} from "../forecastImpl";
import {WeatherService} from "../weather.service";
import {RawForecastImpl} from "../RawForecastImpl";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  newZip: string;
  locations: Location[];

  constructor(private weatherService: WeatherService) {
    this.locations = [];
    this.loadLocationsFromLocalStorage();
  }

  search(): void{
    // console.log('SearchComponent going for new zip of: ' + this.newZip);
    this.addNewLocation(this.newZip, this.locations);
    // console.log(' after calling service the number of locations is ' + this.locations.length);
    this.newZip = '';
  }

  loadLocationsFromLocalStorage(): void {
    for (const localStorageKey in localStorage) {
      if (localStorageKey.startsWith('storedZipCode')){
        const derivedZip =  localStorage.getItem(localStorageKey);
        this.addNewLocation(derivedZip, this.locations);
      }
    }
    // console.log(' loadLocationsFromLocalStorage the number of locations is ' + this.locations.length);
  }

  addNewLocation(zip: string, locations: Location[]): void{
    // console.log('Weatherservice.addNewLocation going for new zip of: ' + zip);
    if (this.validateZip(zip)) {
      const location = new LocationImpl();
      this.weatherService.getLocationFromService(zip)
        .subscribe({
          next: (data) => {
            // console.log('addNewLocation data = ' + JSON.stringify(data, null, 2));
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
            }else{
              console.error('Some other error besides 404 occurred getting ' + zip + ' from service. error status = '
                + err.status + err);
            }
            alert('Unable to find any weather data for ' + zip + '. Please try a different zip code. ');
          },
          complete: () => {
            // console.log('subscription completed for ' + zip + ' and the number of locations is ' + locations.length);
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

  ngOnInit(): void {
  }

}
