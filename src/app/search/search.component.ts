import { Component, inject } from '@angular/core';
import {Location} from '../location';
import {WeatherService} from '../weather.service';
import {Observable, of, forkJoin} from 'rxjs';
import {tap} from 'rxjs/operators';
import {LocationImpl} from '../locationImpl';
import { LocationComponent } from '../location/location.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [LocationComponent,CommonModule,NgIf,FormsModule],
  providers:[],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  weatherService = inject(WeatherService);
  newZip!: string;
  location!: Location;
  locations: Location[];
  locationz: Location[];
  locations$: Observable<Location[]>;
  observables: Observable<Location>[] = [];
  removedZip!: string;

  constructor(){
    this.locations = [];
    this.locationz = this.locations;
    this.locations$ = of(this.locations);
    this.loadLocationsFromLocalStorage();
   }

   search(): void{
    let empty = true;
    let alreadyInList = false;
    let observableNull = false;
    if(!this.checkAlreadyInObservables(this.newZip)){
      const observable =this.addNewLocation(this.newZip);
      if (observable) {
          let subsc = observable.subscribe({
            next: (l ) => {
              if (l.weather[0].main){
                empty = false;
              }
            },
            error: () => {console.log(' bummer! the intended local storage key is null! ');
          },
            complete: () => {
              if (!empty){
                this.observables.push(observable);
                this.locations$ = forkJoin(this.observables);
              }
            }
          });
          subsc.unsubscribe();
      }
      else{
        observableNull = true;
      }
      this.newZip = '';
    }else {
      alert ('The zip code of ' + this.newZip + ' is already in the list. '); 
      alreadyInList = true;     
    }
    if (empty && !alreadyInList && !observableNull){
      alert ('No data for zip ' + this.newZip + '. Try again.');
    }
  }

  checkAlreadyInObservables(zip: string): boolean {
    let result = false;
    if (this.observables){
      this.observables.forEach((o) =>{
        let subscr = o.subscribe({
          next: (l ) => {
            if (l.zip == zip){            
              result = true;
            }
          },
          error: () => {
            console.error(' Bummer error! ');
          },
          complete: () => {}
        });
        subscr.unsubscribe();  
      });
    }
    return result;
  }

   loadLocationsFromLocalStorage(): void {
    let count = 1;

    for (const localStorageKey in localStorage) {
      if (localStorageKey.startsWith('storedZipCode')){        
        const derivedZip =  localStorage.getItem(localStorageKey);
        if(derivedZip && derivedZip !=this.removedZip){
          const observable = this.addNewLocation(derivedZip);        
          if (observable) {
            this.observables.push(observable);
          }
        }
      }
    }
    this.locations$ = forkJoin(this.observables);
  }

  addNewLocation(zip: string): Observable<Location> | null {
    if (this.validateZip(zip) && zip != this.removedZip ) {
      this.location = new LocationImpl();
      const observable = this.weatherService.getLocationFromService(zip).pipe(
        tap(l => {
          this.location = l;
          this.location.weather[0].main = this.getIconFrom(l.weather[0].main);
          this.location.zip = zip;
          localStorage.setItem('storedZipCode' + (zip), zip);
        })
      );
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
}
