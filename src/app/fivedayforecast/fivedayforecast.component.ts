import { Component, OnInit } from '@angular/core';
import {Location} from "../location";
import {ActivatedRoute, Router} from "@angular/router";
import {WeatherService} from "../weather.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-fivedayforecast',
  templateUrl: './fivedayforecast.component.html',
  styleUrls: ['./fivedayforecast.component.css']
})
export class FivedayforecastComponent implements OnInit {

  location: Location;
  subscription: Subscription;

  constructor(route: ActivatedRoute, private _router: Router, private weatherService: WeatherService) {
    let zipParam = route.snapshot.paramMap.get('zipcode');
    this.location = this.weatherService.getWeatherServiceAdapter().findLocationByZipcode(zipParam, this.subscription);

    if (null != this.location.lat && null != this.location.lon) {
      this.weatherService.getWeatherServiceAdapter().searchForFiveDayForecast(this.location, this.subscription);
    }
  }

  navigateBackToMain(): void {
    this._router.navigate(['/']);
  }


  ngOnInit(): void {
  }

  ngOnDestroy(){
    if (null != this.subscription){
      this.subscription.unsubscribe();
    }
  }



}
