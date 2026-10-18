import { afterNextRender, Component,effect,inject, signal, WritableSignal} from '@angular/core';

//import { Observable } from 'rxjs';
//import { Forecast } from '../forecast';
import { ActivatedRoute, Router } from '@angular/router';
import { Weather } from '../weather';
//import {LocationT} from '../location';
//import { LocationImpl } from '../locationImpl';
import { ForecastImpl } from '../forecastImpl';
import { DatePipe} from '@angular/common';
import { OneCallResponse, BobsCompositeOcr, Jeocode } from '../funTypes';
import { initialBobsCompositeOcr, initialGeoCode, initialOneCallResponse } from '../refData';

@Component({
  imports: [DatePipe],
  selector: 'app-fivedayforecast',
  styleUrl: '../app.css',
  templateUrl: './fivedayforecast.html',
})
export class Fivedayforecast {

  weatherService = inject(Weather);
  zipParam: string | null;

  oneCallResponse: OneCallResponse = initialOneCallResponse;
  bobsCompositeOcrSig: WritableSignal<BobsCompositeOcr | undefined> = signal(initialBobsCompositeOcr);
  jeo :Jeocode = initialGeoCode;
  
  constructor(route: ActivatedRoute, private router: Router){ 
    this.zipParam = route.snapshot.paramMap.get('zipcode');
    this.getDataFromZipParam(this.zipParam);

    afterNextRender( ()=> {
      this.runThisStuffAfterComponentLoads();
    });

    effect (() => {
      const bcocr = this.bobsCompositeOcrSig()
      if(bcocr){
        if(bcocr.jeocode){
          this.jeo = bcocr.jeocode;
        }
        if(bcocr.oneCallResponse){
          this.oneCallResponse = bcocr.oneCallResponse;
        }
      }
    } );
    
  }

  private runThisStuffAfterComponentLoads(){
    this.bobsCompositeOcrSig = this.weatherService.getOneCallResponseByZip(signal(this.jeo.zip));
    // TODO put everything after this into an effect - although even in prod it should not take a call to an httpReource - italreadystored if we got this far.
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
    this.weatherService.bobsCompositeOcrsSig().length = 0;
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
