import { Service, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Forecast } from './forecast';
import {LocationT} from './location';
import { KNOWNGEOCODES } from './refData';
import { BobsCompositeOcr, Jeocode, OneCallResponse } from './funTypes';


@Service()
export abstract class Weather {

    constructor() { }
    bobsCompositeOcrsSig: WritableSignal<WritableSignal<BobsCompositeOcr | undefined>[]> =signal(new Array<WritableSignal<BobsCompositeOcr>>);
    //abstract getFiveDayForecastFromService(lat: number, lon: number): Observable<Forecast>;

    abstract getOneCallResponseByZip(zipcode:WritableSignal<String | undefined>): WritableSignal<BobsCompositeOcr | undefined>;

    getGeoCodeInfoFromZip(zipcode:WritableSignal<String | undefined>): WritableSignal<Jeocode | undefined>{
      let result: WritableSignal<Jeocode | undefined> = (signal (undefined));
      let jeo = KNOWNGEOCODES.find(kgc => kgc.zip == zipcode());
      if(jeo){
        result.set(jeo);
      }
      else{
        console.log('Geo not found for zip '+zipcode+'.  Need to call the service //TODO add this part');
      }
      console.log(' getGeoCodeInfoFromZip result()?.name = '+ result()?.name);
      return result;
    }

  
  addOneCallResponse(bco:WritableSignal<BobsCompositeOcr | undefined>):void{
    //check if it alread exists
    this.bobsCompositeOcrsSig().push(bco);
  }

  removeOneCallResponse(bco:WritableSignal<BobsCompositeOcr | undefined>):void{
  //find the inxdex and splice the array
  const bobsCompositeOcrs = this.bobsCompositeOcrsSig();
  let ind = bobsCompositeOcrs.findIndex(bcoA => { 
    const bcoAc = bcoA();
    const bcoc = bco();
    bcoAc && bcoc && bcoAc.jeocode.lat == bcoc.jeocode.lat        
  });
  console.log(' removeOneCallResponse index = ' + ind);
  this.bobsCompositeOcrsSig().splice(ind, 1);
}



}
