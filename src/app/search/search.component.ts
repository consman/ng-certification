import { Component, OnInit } from '@angular/core';
import {Location} from "../location";
import {WeatherService} from "../weather.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  newZip:string;
  subscription: Subscription;
  locations: Location[];

  constructor(private weatherService: WeatherService) {
    this.locations = this.weatherService.locations;
    this.loadLocationsFromLocalStorage();
  }

  search():void{
    this.weatherService.searchForZip(this.newZip, this.weatherService.locations, this.subscription);
    this.newZip='';
  }

  loadLocationsFromLocalStorage(): void {
    for (let localStorageKey in localStorage) {
      if (localStorageKey.startsWith('storedZipCode')){
        let derivedZip =  localStorage.getItem(localStorageKey);
        let storedZipLoc = this.weatherService.findLocationByZipcode(derivedZip, this.subscription);
        if ( null == storedZipLoc){
          console.log('WARNING!! A previously cached location with a zip code of , '+derivedZip+', is no longer found by the service!');
        }
      }
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
     if ( null != this.subscription ) {
       this.subscription.unsubscribe();
     }
  }
}
