import { Component, Input, inject } from '@angular/core';
import {Location} from '../location';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WeatherService } from '../weather.service';
import { Observable, from, of, tap } from 'rxjs';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, NgIf, RouterModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {
  weatherService = inject(WeatherService);
  @Input()
  location!: Location;

  @Input()
  locations!: Location[];

  @Input()
  locationz!: Location[];

  @Input()
  locations$!: Observable<Location[]>;

  @Input()
  observables!: Observable<Location>[]; 

  constructor(){
    
  }

  handleClose(): void {
    // TODO fix valid, but non-existent zip clearing out all zips on page.
    
        const index = this.locations.findIndex( d => d.zip === this.location.zip );
        this.locations.splice(index, 1);

        //console.log('Initial -- going for removal of local storage key for zip = '+ this.location.zip);
        if (null != this.getZipLocalStorageKey(this.location.zip)){
          //console.log(' it is not null -so that is good');
          localStorage.removeItem(this.getZipLocalStorageKey(this.location.zip));
        }
        else{
          console.log(' bummer! the intended local storage key is null! ');
        }

        if(this.locationz){
          const indexz = this.locationz.findIndex( d => d.zip === this.location.zip );
          this.locationz.splice(indexz, 1);
          this.locations$ = of(this.locationz);
        }
        let targetLoc!: Location;
        let found = false;
        let targetObservable!: Observable<Location>;
        if (this.observables){
          this.observables.forEach((o) =>{
            let subscr = o.subscribe({
              next: (l ) => {
                if (l.zip == this.location.zip){            
                  found = true;
                  targetObservable = o;
                  //console.log(' removing '+ this.location.zip +' from the observables.. ');
                }
              },
              error: () => {
                console.error(' Bummer error! ');
              },
              complete: () => {
                //console.log( 'handleClose : Complete and found is ' + found);
                if(found){
                  //console.log(' Subscription completion -- going for removal of local storage key for zip = '+ this.location.zip);
                  if (null != this.getZipLocalStorageKey(this.location.zip)){
                    //console.log(' it is not null -so that is good');
                    localStorage.removeItem(this.getZipLocalStorageKey(this.location.zip));
                  }
                  else{
                    console.log(' bummer! the intended local storage key is null! ');
                  }
                  const zindex = this.observables.findIndex( d => d == targetObservable)
                  //console.log(' found = true and zindex = '+zindex);
                  this.observables.splice(zindex,1);
                }
              }
            });
            subscr.unsubscribe();        
          });
        }
      }
    
      getZipLocalStorageKey(zipcode: string): string {
        let result = null;
        for (const localStorageKey in localStorage) {
          if (localStorageKey.startsWith('storedZipCode')){
            if (localStorage.getItem(localStorageKey) === zipcode){
              result = localStorageKey;
            }
          }
        }
        if ( null == result){
          result = '';
        }
        return result;
      }
    

  spacesToDashes(locationNameWithSpaces: string): string {
    let result = '';
    result = locationNameWithSpaces.replace(' ', '-');
    return result;
  }

}
