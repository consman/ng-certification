import { afterNextRender, Component,effect,inject, Signal, signal, WritableSignal} from '@angular/core';

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

  oneCallResponse: WritableSignal<OneCallResponse | undefined> = signal(initialOneCallResponse);
  bobsCompositeOcrSig: Signal<BobsCompositeOcr | undefined> = signal(initialBobsCompositeOcr);
  jeo :Jeocode = initialGeoCode;
  localBcorsSig:WritableSignal<WritableSignal<BobsCompositeOcr | undefined>[]> = signal(new Array<WritableSignal<BobsCompositeOcr>>);
  
  constructor(route: ActivatedRoute, private router: Router){ 
    this.zipParam = route.snapshot.paramMap.get('zipcode');
    this.getDataFromZipParam(this.zipParam);

    afterNextRender( ()=> {
      this.runThisStuffAfterComponentLoads();
    });
    
  }

  private runThisStuffAfterComponentLoads(){
    
    if(this.jeo.zip && this.jeo.zip.length == 5){

      //let zipSig: WritableSignal<String | undefined> = signal(this.zipParam+'');
      this.bobsCompositeOcrSig = this.weatherService.getExistingBcocrFromMainList(this.jeo.zip);
      console.log('found bcorSig but this.bobsCompositeOcrSig()?.oneCallResponse.lat '+ this.bobsCompositeOcrSig()?.oneCallResponse.lat);
      this.oneCallResponse.set(this.bobsCompositeOcrSig()?.oneCallResponse);
    }
    else{
      console.warn('Fix this. unable to get an existing bcocr with zip '+this.jeo.zip+' from the main list which should be there! ');
    }
  }

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
    //this.weatherService.bobsCompositeOcrsSig().length = 0;
    this.weatherService.backFromMFiveDay.set(true);
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
