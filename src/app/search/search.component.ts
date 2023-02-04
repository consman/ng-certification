import { Component, OnInit } from '@angular/core';
import {Location} from '../location';
import {WeatherService} from '../weather.service';
import {LocationImpl} from '../locationImpl';
import {ForecastImpl} from '../forecastImpl';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  newZip: string;
  locations: Location[];

  constructor(private weatherService: WeatherService) {
    this.loadLocationsFromLocalStorage();
  }

  search(): void{
    console.log('SearchComponent going for new zip of: ' + this.newZip);
    this.weatherService.addNewLocation(this.newZip, this.locations);
    this.newZip = '';
  }

  loadLocationsFromLocalStorage(): void {
    for (const localStorageKey in localStorage) {
      if (localStorageKey.startsWith('storedZipCode')){
        const derivedZip =  localStorage.getItem(localStorageKey);
        this.weatherService.addNewLocation(derivedZip, this.locations);
      }
    }
  }


  ngOnInit(): void {
  }


}
