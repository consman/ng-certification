import { Component, OnInit } from '@angular/core';
import {Location} from '../location';
import {ActivatedRoute, Router} from '@angular/router';
import {WeatherService} from '../weather.service';
import {Subscription} from 'rxjs';
import {LocationImpl} from "../locationImpl";

@Component({
  selector: 'app-fivedayforecast',
  templateUrl: './fivedayforecast.component.html',
  styleUrls: ['./fivedayforecast.component.css']
})
export class FivedayforecastComponent implements OnInit {

  location: Location;
  readyToCallService = false;

  constructor(route: ActivatedRoute, private router: Router, private weatherService: WeatherService) {
    const zipParam = route.snapshot.paramMap.get('zipcode');
    this.getDataFromZipParam(zipParam);
    if (this.readyToCallService){
      this.weatherService.getFiveDay(this.location);
    }
  }

  getDataFromZipParam(zp: string): void{
    console.log(' Data from zip  param is: ' + zp);
    if ( null != zp && zp !== '' && zp.length > 0) {
      const parts = zp.split('+');
      if ( null != parts && parts.length < 4){
        this.location = new LocationImpl();
        this.location.zip = parts[0];
        this.location.name = this.dashesToSpaces((parts[1]));
        this.location.lat = parseInt(parts[2], 0);
        this.location.lon = parseInt(parts[3], 0);
        this.readyToCallService = true;
      }
      else{
        console.error('Something is wrong! not enough parts! ');
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
    result = result = locationNameWithDashes.replace('-', '');
    return result;
  }

}
