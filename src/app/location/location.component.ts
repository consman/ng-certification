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
    
        const index = this.locations.findIndex( d => d.zip === this.location.zip );
        this.locations.splice(index, 1);

        if (null != this.getZipLocalStorageKey(this.location.zip)){
          localStorage.removeItem(this.getZipLocalStorageKey(this.location.zip));
        }

        if(this.locationz){
          const indexz = this.locationz.findIndex( d => d.zip === this.location.zip );
          this.locationz.splice(indexz, 1);
          this.locations$ = of(this.locationz);
        }
        let found = false;
        let targetObservable!: Observable<Location>;
        if (this.observables){
          this.observables.forEach((o) =>{
            let subscr = o.subscribe({
              next: (l ) => {
                if (l.zip == this.location.zip){            
                  found = true;
                  targetObservable = o;
                }
              },
              error: () => {
                console.error(' Bummer error! ');
              },
              complete: () => {
                if(found){
                  if (null != this.getZipLocalStorageKey(this.location.zip)){
                    localStorage.removeItem(this.getZipLocalStorageKey(this.location.zip));
                  }
                  const zindex = this.observables.findIndex( d => d == targetObservable)
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
