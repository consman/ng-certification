import { Component, OnInit } from '@angular/core';
import {Location} from '../location';
import {WeatherService} from '../weather.service';
import {Observable, of, forkJoin} from 'rxjs';
import {tap} from 'rxjs/operators';
import {LocationImpl} from '../locationImpl';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  newZip: string;
  location: Location;
  locations: Location[];
  locations$: Observable<Location[]>;
  observables: Observable<Location>[] = [];

  constructor(private weatherService: WeatherService) {
    console.log( 'A NEW SEARCH COMPONENT!!');
    this.locations = [];
    this.locations$ = of(this.locations);
    this.loadLocationsFromLocalStorage();
   }

  search(): void{
    console.log( 'the index is: ' + this.locations.findIndex( d => d.zip === this.newZip ));
    if (this.locations.findIndex( d => d.zip === this.newZip ) === -1) {
      const observable =this.addNewLocation(this.newZip);
      if (observable) {
        this.observables.push(observable);
      }
      this.newZip = '';
      console.log('search ran..');
    }else {
      alert ('The zip code of ' + this.newZip + ' is already in the list. ');
    }
    this.locations$ = forkJoin(this.observables);
  }

  loadLocationsFromLocalStorage(): void {
    let count = 1;
    const delay = (environment.production ? 175 : 1);
    const additionalDelay = (environment.production ? 50 : 1);

    for (const localStorageKey in localStorage) {
      if (localStorageKey.startsWith('storedZipCode')){
        console.log(' localStorageKey going for ' + localStorageKey);
        const derivedZip =  localStorage.getItem(localStorageKey);
        const observable = this.addNewLocation(derivedZip);
        if (observable) {
          this.observables.push(observable);
        }
      }
    }
    this.locations$ = forkJoin(this.observables);
  }

  addNewLocation(zip: string): Observable<Location> | null {
    if (this.validateZip(zip) ) {
      console.log(' BEFORE calling this.weatherService.getLocationFromService(zip)');
      this.location = new LocationImpl();
      const observable = this.weatherService.getLocationFromService(zip).pipe(
        tap(l => {
          console.log(' beginning tap for zip : ' + zip + '  and the temp is: ' + l.main.temp + ' and the icon is: ' + l.weather[0].main);
          this.location = l;
          this.location.weather[0].main = this.getIconFrom(l.weather[0].main);
          this.location.zip = zip;
          this.locations.push(this.location);
          localStorage.setItem('storedZipCode' + (zip), zip);
          console.log(' done with tap for zip : ' + zip);
        })
      );
      console.log(' AFTER calling this.weatherService.getLocationFromService(zip)  : ');
      return observable;
    } else {
      console.error('ERROR! ' + zip + ' zip is not valid');
      alert('Unable to find any weather data for ' + zip + '. Please try a different zip code. ');
      return null;
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
    if ( input === 'clouds' || input === 'sun' || input === 'rain' || input === 'snow' ){
      return input; // Disabling cache does not always work
    }
    return 'sun';
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
  }
}
