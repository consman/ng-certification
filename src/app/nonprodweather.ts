import {  signal, WritableSignal , Injectable, Signal} from '@angular/core';
import { Weather } from './weather';
import { ONECALLRESPONSES , GEOCODESFORNONPROD} from './mock-data';
import { Lokation, Jeocode, OneCallResponse } from './funTypes';
import { initialLokation, initialGeoCode, KNOWNGEOCODES } from './refData';

@Injectable({ providedIn: 'root' })
export class Nonprodweather extends Weather {


  override getFinalOneCallResponse(): () => OneCallResponse | undefined {
    return this.oneCallForSearchResp;
  }


   override getFinalJeoCode(): () => Jeocode | undefined {
     return this.saveJeoesult;
   }

  
   override getOneCallResponseByJeo(): void {
    let result:WritableSignal<(OneCallResponse | undefined)> = signal(undefined);
    const jeoCode = this.inputJeoForOneCallSig();
    if(jeoCode && jeoCode.zip.length == 5 ){
      let ocr = ONECALLRESPONSES.find(ocr => ocr.lat == jeoCode.lat && ocr.lon == jeoCode.lon);      
      if (ocr && ocr.lat == jeoCode.lat){ 
        result.set(ocr);       
        console.log('success! Nonprodweather getOneCallResponseByJeo Codefound the OCR for zip ' + jeoCode.zip);
      }
    }
    this.oneCallForSearchResp = result;
  }

   override getJeoCodeByUnKnownZipSig(): void {
    //let result: WritableSignal<Jeocode | undefined> = signal(undefined);
    const zip = this.zzipSig();
    if(zip){
      GEOCODESFORNONPROD.forEach(g => {
      if(g.zip == zip){
        this.saveJeoesult.set(g);
        this.setInputJeoForOneCallSig(this.saveJeoesult);
        console.log('success! Nonprodweather  getGeoCodeInfoFromZipWoKnownGeoCodes found geo for ' + zip);
      }
    });
    }   
  }

  saveJeoesult: WritableSignal<Jeocode | undefined> = signal(undefined);
  
}