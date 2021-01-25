import {Component, Input, OnInit} from '@angular/core';
import {Location} from "../location";
import {SearchComponent} from "../search/search.component";
import {Forecast} from "../forecast";

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
    let index = this.locations.findIndex( d => d.zip === this.location.zip );
    this.locations.splice(index,1);
    let found = false;
    for (let localStorageKey in localStorage) {
      if (localStorageKey.startsWith('storedZipCode')){
        if (localStorage.getItem(localStorageKey) == this.location.zip){
          localStorage.removeItem(localStorageKey);
          found = true;
        }
      }
    }
    if (!found){
      console.log( 'WARNING!!  Unable to find a stored zip code of: '+ this.location.zip + ' in the cache that needed to be removed. Check to see why is was never added.');
    }
  }

  ngOnInit(): void {
  }

}
