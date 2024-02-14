import { Component, Input, inject } from '@angular/core';
import {Location} from '../location';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WeatherService } from '../weather.service';

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

  constructor(){
    
  }

  handleClose(): void {
    // TODO we need to have the list of locations from the search results so that we can remove
    // the closed location from it here as well as remove it from local storage.
    
        const index = this.locations.findIndex( d => d.zip === this.location.zip );
        this.locations.splice(index, 1);
        if (null != this.getZipLocalStorageKey(this.location.zip)){
          localStorage.removeItem(this.getZipLocalStorageKey(this.location.zip));
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
