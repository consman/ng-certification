import { Component, inject } from '@angular/core';
import {Location} from '../location';
import {WeatherService} from '../weather.service';
import {Observable, of, forkJoin} from 'rxjs';
import {tap} from 'rxjs/operators';
import {LocationImpl} from '../locationImpl';
import {environment} from '../../environments/environment';
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
    //console.log(' new zip is: '+ this.newZip);
    //console.log(' number of locations is : ' +  this.locations.length);
    if(!this.checkAlreadyInObservables(this.newZip)){
    //if (this.locations.findIndex( d => d.zip === this.newZip ) === -1) {
      const observable =this.addNewLocation(this.newZip);
      if (observable) {
        console.log(' Search -> Back from addNewLocation and adding to the observables...');
        //if(!this.checkAlreadyInObservables(this.newZip)){
          this.observables.push(observable);
          this.locations$ = forkJoin(this.observables);
        //}
      }
      this.newZip = '';
    }else {
      alert ('The zip code of ' + this.newZip + ' is already in the list. ');
    }
  }

  checkAlreadyInObservables(zip: string): boolean {
    let result = false;
    console.log('length of array in checkAlreadyInObservables is '+ this.observables.length);

    if (this.observables){
      this.observables.forEach((o) =>{
        console.log(' In the forEach loop and o = '+ o);
        let subscr = o.subscribe({
          next: (l ) => {
            if (l.zip == zip){            
              result = true;
            }
          },
          error: () => {
            console.error(' Bummer error! ');
          },
          complete: () => {
            if(result){
              console.log('checkAlreadyInObservables says zip of ' + zip + ' is already in the observables.');
            }
            console.log( 'checkAlreadyInObservables: Complete and result is ' + result);
          }
        });
        subscr.unsubscribe();
  
      });
    }

    console.log('checkAlreadyInObservables result is '+result);
    return result;
  }

   loadLocationsFromLocalStorage(): void {
    let count = 1;

    for (const localStorageKey in localStorage) {
      if (localStorageKey.startsWith('storedZipCode')){        
        const derivedZip =  localStorage.getItem(localStorageKey);
        if(derivedZip && derivedZip !=this.removedZip){
          console.log('loadLocationsFromLocalStorage going to call addNewLocation for zip '+ derivedZip);
          const observable = this.addNewLocation(derivedZip);        
          if (observable) {
            console.log(' loadLocationsFromLocalStorage -> Back from addNewLocation and adding to the observables...');
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
          //this.locations.push(this.location);
          console.log(' addNewLocation -- going for adding to local storage: '+zip);
          localStorage.setItem('storedZipCode' + (zip), zip);
        })
      );
      console.log('addNewLocation returning observable for zip '+ zip);
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
