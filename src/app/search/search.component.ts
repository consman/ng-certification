import { afterNextRender, Component, inject } from '@angular/core';
import { LocationComponent } from '../location/location.component';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../weather.service';
import { catchError, delay, forkJoin, Observable, of, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {Location} from '../location';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-search',
  imports: [LocationComponent,FormsModule, AsyncPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  weatherService = inject(WeatherService);
  newZip!: string;
  locations$: Observable<Location[]>;
  locations: Location[];
  location!: Location;
  observables: Observable<Location>[] = [];

  constructor(){
    this.locations = [];
    
    afterNextRender( ()=> {
      this.loadLocationsFromLocalStorage();
    });
    this.locations$ = of(this.locations);
    //console.log(' - - - - -  constructor');
  }
  
  search(): void{ 
    if (this.locations.findIndex( d => d.zip === this.newZip ) === -1) { 
      const observable = this.addNewLocation(this.newZip);
      
      if (observable) {
        this.observables.push(observable);
        this.locations$ = of(this.locations);
        this.locations$ = forkJoin(this.observables);
      }
        
      this.newZip = '';
    }else {
      alert ('The zip code of ' + this.newZip + ' is already in the list. ');
    }
    
    console.log('Done with search(). The number of this.locations is: '+ this.locations.length);

  }

  addNewLocation(zip: string): Observable<Location> | null {
    if (this.validateZip(zip) ) {
      
      const observable = this.weatherService.getLocationFromService(zip).pipe(delay(0),
        tap(l => {
          
          this.location = l;
          this.location.weather[0].main = this.getIconFrom(l.weather[0].main);
          this.location.zip = zip;
          this.addToLocationsArray(this.location);    
          localStorage.setItem('storedZipCode' + (zip), zip);
          console.log('In tap(). just added '+ zip + ' to the local storage...');
         
        }),
        catchError((err: HttpErrorResponse) => {
          alert('The zip code, ' + zip + ', is formatted OK, but no data is returned.');          
          this.locations$ = of(this.locations);              
          throw 'Nothing found for zip '+ zip+' . Details: ' + err.status;
        }) 
      );
      return observable;
    }
    else {
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

  loadLocationsFromLocalStorage(): void {
    
    for (const localStorageKey in localStorage) {
          
        if (localStorageKey.startsWith('storedZipCode')){        
          const derivedZip =  localStorage.getItem(localStorageKey);        
          if(derivedZip && this.locations.findIndex( d => d.zip === derivedZip ) === -1){
            console.log('Going for addNewLocation for '+derivedZip);                     
            const observable = this.addNewLocation(derivedZip);                   
            if (observable) {
              this.observables.push(observable);
            }         
          }
        }
      
    }
    this.locations$ = of(this.locations);
    this.locations$ = forkJoin(this.observables);
  }

  addToLocationsArray(location: Location): void{
    // check for dups first -- although this may havbe already been done..
    if (this.locations.findIndex( d => d.zip === location.zip ) === -1) {
      this.locations.push(location);
    }
  }
  
/*
  logNumberOfLocs() : void{
    console.log('The number of locations is: '+ this.locations.length);
  }
  logRecentZip():void{
    let result = '';
    if (this.location && this.location.zip){
      result = this.location.zip
    }
    console.log('The recent zip is '+ result );
  }
  */
 
}
