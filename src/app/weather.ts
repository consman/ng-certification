import { effect, Service, signal, WritableSignal } from '@angular/core';
import { BobsCompositeOcr, Jeocode, OneCallResponse } from './funTypes';

@Service()
export abstract class Weather {

    constructor() { 
    }

/* 
A) use the zip to try to get the geo 
A_1) try from from known geo codes first
A_2) if that does not work, try calling the service "WoKnown"
B) you have arrived here if and only if you have a valid JeoCode - use the oneCall Serve to get the OnCall Response Sig

*/

    bobsCompositeOcrsSig: WritableSignal<WritableSignal<BobsCompositeOcr | undefined>[]> =signal(new Array<WritableSignal<BobsCompositeOcr>>);
    //currentZipSig:WritableSignal<String | undefined>=signal('');

    //abstract getFiveDayForecastFromService(lat: number, lon: number): Observable<Forecast>;
    abstract getGeoCodeInfoFromZipWoKnownGeoCodes(zipcode:WritableSignal<String | undefined>): WritableSignal<Jeocode | undefined>;
    abstract getOneCallResponseByZip(zipcode:WritableSignal<String | undefined>): WritableSignal<BobsCompositeOcr | undefined>;
    abstract getGeoCodeInfoFromZipWithKnownGeoCodes(zipcode:WritableSignal<String | undefined>): void;//WritableSignal<Jeocode | undefined>;

    doneWithPushSig: WritableSignal<boolean> = signal( false);

  
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
