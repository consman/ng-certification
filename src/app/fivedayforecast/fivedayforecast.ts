import { Component,inject, signal} from '@angular/core';

//import { Observable } from 'rxjs';
//import { Forecast } from '../forecast';
import { ActivatedRoute, Router } from '@angular/router';
import { Weather } from '../weather';
//import {LocationT} from '../location';
//import { LocationImpl } from '../locationImpl';
import { ForecastImpl } from '../forecastImpl';
import { DatePipe} from '@angular/common';
import { OneCallResponse, BobsCompositeOcr, Jeocode } from '../funTypes';
import { initialBobsCompositeOcr, initialOneCallResponse } from '../refData';

@Component({
  imports: [DatePipe],
  selector: 'app-fivedayforecast',
  styleUrl: '../app.css',
  templateUrl: './fivedayforecast.html',
})
export class Fivedayforecast {

  weatherService = inject(Weather);
  //location: LocationT;
  zipParam: string | null;
  //obsForecast$: Observable<Forecast>;
  oneCallResponse: OneCallResponse = initialOneCallResponse;
  bobsCompositeOcr: BobsCompositeOcr = initialBobsCompositeOcr;
  jeo :Jeocode = this.bobsCompositeOcr.jeocode;
  


  constructor(route: ActivatedRoute, private router: Router){ 
    this.zipParam = route.snapshot.paramMap.get('zipcode');
    //this.location = new LocationImpl();
    //this.location.forecasts = new Array<ForecastImpl>();
    this.getDataFromZipParam(this.zipParam);
    //this.obsForecast$ = this.weatherService.getFiveDayForecastFromService(this.location.coord.lat, this.location.coord.lon);
    this.init();
  }

  private init(){
    let bcocrSig = this.weatherService.getOneCallResponseByZip(signal(this.jeo.zip));
    // put everything after this into an effect - although even in prod it should not take a call to an httpReource - italreadystored if we got this far.
    const bcocr = bcocrSig();
    if(bcocr){
      this.oneCallResponse = bcocr.oneCallResponse;
      this.jeo;
      // TODO add our jeo to the bcocr -- bcocrSig().update((b) => );
    }
    else{
      //this.oneCallResponse = initialOneCallResponse;
      console.log(this.jeo.zip + ' Not found..');
    }
  }
/*
  getLocFromObservable(forecast: Forecast | null): LocationT {
    
    if(!this.location.forecasts){
      this.location.forecasts = new Array();
    }      
    if (!forecast || null == forecast) {
      forecast = new ForecastImpl();
    }
    this.location.forecasts[0] = forecast;
    return this.location;
  }
*/
  getDataFromZipParam(zp: string | null): void{

    if ( null != zp && zp !== '' && zp.length > 0) {
      const parts = zp.split('+');
      if ( null != parts && parts.length === 4){
        // this.location = new LocationImpl();
        this.jeo.zip = parts[0];
        this.jeo.name = this.dashesToSpaces((parts[1]));
        this.jeo.lat = parseFloat(parts[2]);
        this.jeo.lon = parseFloat(parts[3]);

      }
      else{
        console.error('Something is wrong! not enough parts! Only ' + parts.length );
      }
    }
  }

  navigateBackToMain(): void {
    this.router.navigate(['/']);
  }

  getIconFrom(input: string): string{
    if ( input === 'Clouds'){
      return 'clouds';
    }
    if ( input === 'Sunny'){
      return 'sun';
    }
    if ( input === 'Rain'){
      return 'rain';
    }
    if ( input === 'Snow'){
      return 'snow';
    }
    return 'sun';
  }

  convertEpocToDayofWeek(epoc: number ): Date{
    const date = new Date(epoc * 1000);
    return date;
  }

  dashesToSpaces(locationNameWithDashes: string): string {
    let result = '';
    result = result = locationNameWithDashes.replace('-', ' ');
    return result;
  }

}
