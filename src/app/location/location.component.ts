import {Component, Input, OnInit} from '@angular/core';
import {Location} from '../location';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  @Input()
  location: Location;

  @Input()
  locations: Location[];

  constructor(  ) {
  }

  handleClose(): void {
// we need to have the list of locations from the search results so that we can remove
// the closed location from it here as well as remove it from local storage.
    const index = this.locations.findIndex( d => d.zip === this.location.zip );
    this.locations.splice(index, 1);
    let found = false;
    for (const localStorageKey in localStorage) {
      if (localStorageKey.startsWith('storedZipCode')){
        if (localStorage.getItem(localStorageKey) === this.location.zip){
          localStorage.removeItem(localStorageKey);
          found = true;
        }
      }
    }
    if (!found){
      console.log( 'WARNING!!  Unable to find a stored zip code of: ' + this.location.zip + ' in the cache that needed to be removed. Check to see why is was never added.');
    }
  }

  ngOnInit(): void {
  }

  spacesToDashes(locationNameWithSpaces: string): string {
    let result = '';
    result = locationNameWithSpaces.replace(' ', '-');
    return result;
  }

}
