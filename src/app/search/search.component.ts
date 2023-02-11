import { Component, OnInit } from '@angular/core';
import {Location} from '../location';
import {WeatherService} from '../weather.service';
import {Observable, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  newZip: string;
  locations: Location[];
  location$: Observable<Location>;

  constructor(private weatherService: WeatherService) {
    this.locations = [];
    this.loadLocationsFromLocalStorage();
   }

  search(): void{
    this.addNewLocation(this.newZip);
    this.newZip = '';
    console.log('search ran..');
  }

  loadLocationsFromLocalStorage(): void {
    for (const localStorageKey in localStorage) {
      if (localStorageKey.startsWith('storedZipCode')){
        console.log(' localStorageKey going for ' + localStorageKey);
        const derivedZip =  localStorage.getItem(localStorageKey);
        this.addNewLocation(derivedZip);
      }
    }
  }

  addNewLocation(zip: string): void{
    if (this.validateZip(zip)) {
      console.log(' BEFORE calling this.weatherService.getLocationFromService(zip)  : ');
      this.location$ = this.weatherService.getLocationFromService(zip).pipe(tap(l => {
          console.log(' beginning tap for zip : ');
          this.locations.push(l);
          l.weather[0].main = this.getIconFrom(l.weather[0].main);
          localStorage.setItem('storedZipCode' + (zip), zip);
          console.log(' done with tap for zip : ' + zip);
        }
      ));
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

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void{
    }
}
