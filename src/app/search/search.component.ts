import { Component, OnInit } from '@angular/core';
import {Location} from '../location';
import {LocationImpl} from '../locationImpl';
import {WeatherService} from '../weather.service';

import {map, tap} from "rxjs/operators";
import {from, Observable, of} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  newZip: string;
  locations: Location[];
  locations$: Observable<Location[]>;

  constructor(private weatherService: WeatherService) {
    this.locations = [];
    this.loadLocationsFromLocalStorage();
    this.locations$ = of(this.locations);
      }

  search(): void{
    this.addNewLocation(this.newZip);
    this.newZip = '';
  }

  loadLocationsFromLocalStorage(): void {
    for (const localStorageKey in localStorage) {
      if (localStorageKey.startsWith('storedZipCode')){
        const derivedZip =  localStorage.getItem(localStorageKey);
        this.addNewLocation(derivedZip);
      }
    }
  }

  addNewLocation(zip: string): void{
    // tslint:disable-next-line:prefer-const
    let myLocation: Location;
    if (this.validateZip(zip)) {
      console.log(' BEFORE calling this.weatherService.getLocationFromService(zip)  : ');
      this.weatherService.getLocationFromService(zip).pipe(tap(l => {
        console.log(' beginning tap for zip : ');
        this.locations.push(l);
        const temp = this.getIconFrom(l.weather[0].main);
        l.weather[0].main = temp;
        localStorage.setItem('storedZipCode' + (zip), zip);
        console.log(' done with tap for zip : ' + zip);
        }
      ), map(l => myLocation));
      console.log(' AFTER calling this.weatherService.getLocationFromService(zip)  : ');
    } else {
      console.error('ERROR! ' + zip + ' zip is not valid');
      alert('Unable to find any weather data for ' + zip + '. Please try a different zip code. ');
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

  getName(location: Location): string {
    let result = '';
    if ( location !== undefined && location != null  && location.name != null ){
      result =  location.name;
    }
    return result;
  }

  ngOnInit(): void {
  }

}
