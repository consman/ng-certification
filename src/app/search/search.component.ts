import { afterNextRender, Component, inject } from '@angular/core';
import {Location} from '../location';
import {WeatherService} from '../weather.service';
import {Observable, of, forkJoin } from 'rxjs';
import {tap} from 'rxjs/operators';
import {LocationImpl} from '../locationImpl';

import { LocationComponent } from '../location/location.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { LocationremovalService } from '../locationremoval.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [LocationComponent,CommonModule,NgIf,FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  weatherService = inject(WeatherService);
  newZip!: string;
  location!: Location;
  locations: Location[];
  locations$: Observable<Location[]>;
  observables: Observable<Location>[] = [];
  myVal: number = 5;
  locationsMapIndex: number = 0;

  constructor(private locationremovalService: LocationremovalService){
    this.locations = [];
    this.locations$ = of(this.locations);
    afterNextRender( ()=> {
      this.loadLocationsFromLocalStorage();
    });
   }

   search(): void{    
    this.resolveRemovals();    
    if ( !this.locationremovalService.checkRemovedLocation(this.newZip)){
      if (this.locations.findIndex( d => d.zip === this.newZip ) === -1) {      
        const observable =this.addNewLocation(this.newZip);

        if (observable) {
          this.observables.push(observable);
        }
        this.newZip = '';
      
      }else {
        alert ('The zip code of ' + this.newZip + ' is already in the list. ');
      }
      
      this.locations$ = of(this.locations);
      this.locations$ = forkJoin(this.observables);    
    }
  }

  resolveRemovals() :void {

    let newArr : Location[]=[]; //for deleteing later
    
    let removed = this.locationremovalService.getRemovedLocations();
    if(removed && removed.length>0)
      removed.forEach(rl =>{
      let zip = rl.zip;
      newArr.push(rl);
      console.log(' 040 The obs map looks like this: '+ this.locationremovalService.printMap());
    
      if (this.locationremovalService.checkRemovedLocation(zip)){
        const index = this.locations.findIndex( d => d.zip === zip );
        this.locations.splice(index, 1);
        let findex = this.locationremovalService.getObsIndex(zip);
        let arrayOfDeleted = this.observables.splice(findex,1);

      }
    });
    newArr.forEach(nl => {
      this.locationremovalService.unRemoveRemovedLocation(nl.zip);
    });     
   }


   loadLocationsFromLocalStorage(): void {

    for (const localStorageKey in localStorage) {
      if (localStorageKey.startsWith('storedZipCode')){        
        const derivedZip =  localStorage.getItem(localStorageKey);
        
        if(derivedZip && this.locations.findIndex( d => d.zip === derivedZip ) === -1){
          this.resolveRemovals();
          
          if ( !this.locationremovalService.checkRemovedLocation(derivedZip)){

          const observable = this.addNewLocation(derivedZip);        
          if (observable) {
            this.observables.push(observable);
          }
        }
        }
      }
    }
    this.locations$ = of(this.locations);
    this.locations$ = forkJoin(this.observables);
  }

  addNewLocation(zip: string): Observable<Location> | null {
    this.resolveRemovals();
    if (this.validateZip(zip) ) {
      this.location = new LocationImpl();
      const observable = this.weatherService.getLocationFromService(zip).pipe(
        tap(l => {
          this.location = l;
          this.location.weather[0].main = this.getIconFrom(l.weather[0].main);
          this.location.zip = zip;
          this.addToLocationsArray(this.location);          
          localStorage.setItem('storedZipCode' + (zip), zip);
          console.log('just added '+ zip + ' to the local storage...');
          this.locationsMapIndex++;
        }),
        catchError((err: HttpErrorResponse) => {
          alert('The zip code, ' + zip + ', is formatted OK, but no data is returned.');          
          this.locations$ = of(this.locations);              
          throw 'Nothing found for zip '+ zip+' . Details: ' + err.status;
        }) 
      );
      return observable;
    } else {
      console.error('ERROR! ' + zip + ' zip is not valid');
      alert('Unable to find any weather data for ' + zip + '. Please try a different zip code. ');
      return null;
    }
  }

  addToLocationsArray(location: Location): void{
    // check for dups first -- although this may havbe already been done..
    if (this.locations.findIndex( d => d.zip === location.zip ) === -1) {
      this.locations.push(location);
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

  printLocs(): string{
    let result ='';
    this.locations.forEach(loc =>{
      result = result + loc.zip + ' ';
    });
    return result;
   }  

}

