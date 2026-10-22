import { effect, Service, signal, WritableSignal , computed, Signal, Injectable} from '@angular/core';
import { Weather } from './weather';
import { ONECALLRESPONSES , GEOCODESFORNONPROD} from './mock-data';
import { Lokation, Jeocode, OneCallResponse } from './funTypes';
import { initialLokation, initialGeoCode, KNOWNGEOCODES } from './refData';

@Injectable({ providedIn: 'root' })
export class Nonprodweather extends Weather {

  override getOneCallResponseByJeoCode(joeCode: Jeocode): void {
    let result:(OneCallResponse | undefined) = undefined;
    result = ONECALLRESPONSES.find(ocr => ocr.lat == joeCode.lat && ocr.lon == joeCode.lon);
    if (result){
      
      this.inProgressOneCallResponseSig.set(result);
      console.log('success! Nonprodweather  getOneCallResponseByJeoCodefound the OCR for zip ' + joeCode.zip);
      this.genLok(joeCode,result);
    }
  }

  override getGeoCodeInfoFromZipWoKnownGeoCodes(zipCodeSig: WritableSignal<String | undefined>): WritableSignal<Jeocode | undefined> {
    let result: WritableSignal<Jeocode | undefined> = signal(undefined);
    const zipCode = zipCodeSig();
    if(zipCode){
      GEOCODESFORNONPROD.forEach(g => {
      if(g.zip == zipCode){
        result.set(g);
        console.log('success! Nonprodweather  getGeoCodeInfoFromZipWoKnownGeoCodes found geo for ' + zipCode);
      }
    });
    }
    return result;
  }

  
}