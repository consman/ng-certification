import { Component, inject } from '@angular/core';
import {Location} from '../location';
import {WeatherService} from '../weather.service';
import {Observable, of, forkJoin, Subscription, combineLatest} from 'rxjs';
import {tap} from 'rxjs/operators';
import {LocationImpl} from '../locationImpl';
import {environment} from '../../environments/environment';
import { LocationComponent } from '../location/location.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { LocationremovalService } from '../locationremoval.service';

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
  locations$: Observable<Location[]>;
  observables: Observable<Location>[] = [];
  myVal: number = 5;
  locationsMapIndex: number = 0;

  constructor(private locationremovalService: LocationremovalService){
    this.locations = [];
    this.locations$ = of(this.locations);
    this.loadLocationsFromLocalStorage();

    console.log('001 The locations are: ' +this.printLocs());
   }

   resolveRemovals():void{

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
        
        console.log( 'The size of the observables array BEFORE is: '+ this.observables.length);
        let findex = this.locationremovalService.getObsIndex(zip);
        console.log(' going for splicing '+ findex + ' out of the observables for zip: '+ zip);
        let arrayOfDeleted = this.observables.splice(findex,1);
        console.log(' number of deleted elements is:' + arrayOfDeleted.length);
        console.log( 'The size of the observables array AFTER is: '+ this.observables.length);

      }
    });
    newArr.forEach(nl => {
      this.locationremovalService.unRemoveRemovedLocation(nl.zip);
    });

       
   }

   search(): void{
    
    this.resolveRemovals();
    console.log('002 The locations are: ' +this.printLocs());

    if (this.locations.findIndex( d => d.zip === this.newZip ) === -1) {
      console.log(' Locations BEFORE good search: '+ this.printLocs());
      const observable =this.addNewLocation(this.newZip);
      console.log('003 The locations are: ' +this.printLocs());
      if (observable) {
        this.observables.push(observable);
        console.log('004 The locations are: ' +this.printLocs());
      }
      this.newZip = '';
     
    }else {
      alert ('The zip code of ' + this.newZip + ' is already in the list. ');
    }
    console.log('005 The locations are: ' +this.printLocs());
    this.locations$ = of(this.locations);
    this.locations$ = forkJoin(this.observables);
    
    console.log('006 The locations are: ' +this.printLocs());    

  }

   loadLocationsFromLocalStorage(): void {
    console.log('007 The locations are: ' +this.printLocs());

    for (const localStorageKey in localStorage) {
      if (localStorageKey.startsWith('storedZipCode')){        
        const derivedZip =  localStorage.getItem(localStorageKey);
        
        if(derivedZip && this.locations.findIndex( d => d.zip === derivedZip ) === -1){
          this.resolveRemovals();
          const observable = this.addNewLocation(derivedZip);        
          if (observable) {
            this.observables.push(observable);
            console.log('008 The locations are: ' +this.printLocs());
          }
        }
      }
    }
    console.log('009 The locations are: ' +this.printLocs());
    this.locations$ = of(this.locations);
    this.locations$ = forkJoin(this.observables);
    console.log('010 The locations are: ' +this.printLocs());
  }

  addNewLocation(zip: string): Observable<Location> | null {
    this.resolveRemovals();
    console.log('011 The locations are: ' +this.printLocs());
    if (this.validateZip(zip) ) {
      this.location = new LocationImpl();
      const observable = this.weatherService.getLocationFromService(zip).pipe(
        tap(l => {
          this.location = l;
          this.location.weather[0].main = this.getIconFrom(l.weather[0].main);
          this.location.zip = zip;
          this.addToLocationsArray(this.location);          
          localStorage.setItem('storedZipCode' + (zip), zip);
          this.locationsMapIndex++;
        })
      );
      console.log('012 The locations are: ' +this.printLocs());
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
      console.log('013 The locations are: ' +this.printLocs());
      this.locations.push(location);
      console.log('014 The locations are: ' +this.printLocs());
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
