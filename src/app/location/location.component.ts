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
    return result;
  }

  ngOnInit(): void {
  }

  spacesToDashes(locationNameWithSpaces: string): string {
    let result = '';
    result = locationNameWithSpaces.replace(' ', '-');
    return result;
  }


}
