import { Component, OnInit } from '@angular/core';
import {Location} from '../location';
import {LocationImpl} from '../locationImpl';
import {WeatherService} from '../weather.service';

import {tap} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  newZip: string;
  locations: Location[];
  locObservable$: Observable<LocationImpl>;

  constructor(private weatherService: WeatherService) {
    this.locations = [];
    this.loadLocationsFromLocalStorage();
  }

  search(): void{
    this.addNewLocation(this.newZip, this.locations);
    this.newZip = '';
  }

  loadLocationsFromLocalStorage(): void {
    for (const localStorageKey in localStorage) {
      if (localStorageKey.startsWith('storedZipCode')){
        const derivedZip =  localStorage.getItem(localStorageKey);
        this.addNewLocation(derivedZip, this.locations);
      }
    }
  }

  addNewLocation(zip: string, locations: Location[]): void{
    if (this.validateZip(zip)) {
      this.locObservable$ = this.weatherService.getLocationFromService(zip).pipe(tap((l) => {
        locations.push(l);
        const temp = this.getIconFrom(l.weather[0].main);
        l.weather[0].main = temp;
        localStorage.setItem('storedZipCode' + (zip), zip);
      } ));
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
