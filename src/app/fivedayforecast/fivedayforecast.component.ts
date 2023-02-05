import { Component, OnInit } from '@angular/core';
import {Location} from '../location';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {WeatherService} from '../weather.service';
import {Observable, Subscription} from 'rxjs';
import {LocationImpl} from "../locationImpl";
import {Forecast} from "../forecast";

@Component({
  selector: 'app-fivedayforecast',
  templateUrl: './fivedayforecast.component.html',
  styleUrls: ['./fivedayforecast.component.css']
})
export class FivedayforecastComponent implements OnInit {

  location: Location;
  readyToCallService = false;
  zipParam: string;
  forecast: Forecast;

  constructor(route: ActivatedRoute, private router: Router, private weatherService: WeatherService) {
    if (route.snapshot === undefined){
      // TODO Very bad hack until I can find how to mock route snapshot params
      this.zipParam = '95630+Folsom+38.6709+-121.1529';
      console.error('ERROR! Unable to read the zipcode passed in the the location! Using Test Data');
    } else{
      this.zipParam = route.snapshot.paramMap.get('zipcode');
    }
    this.getDataFromZipParam(this.zipParam);
  }

  getDataFromZipParam(zp: string): void{

    if ( null != zp && zp !== '' && zp.length > 0) {
      const parts = zp.split('+');
      if ( null != parts && parts.length === 4){
        this.location = new LocationImpl();
        this.location.zip = parts[0];
        this.location.name = this.dashesToSpaces((parts[1]));
        this.location.lat = parseFloat(parts[2]);
        this.location.lon = parseFloat(parts[3]);
        this.readyToCallService = true;
      }
      else{
        console.error('Something is wrong! not enough parts! Only ' + parts.length );
      }
      if (this.readyToCallService){
        this.forecast = this.weatherService.getFiveDay(this.location);
      }
    }
  }

  navigateBackToMain(): void {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {

  }

  dashesToSpaces(locationNameWithDashes: string): string {

    let result = '';
    result = result = locationNameWithDashes.replace('-', ' ');
    return result;
  }

}
