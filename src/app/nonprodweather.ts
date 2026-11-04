import {  signal, WritableSignal , Injectable, Signal, effect} from '@angular/core';
import { Weather } from './weather';
import { ONECALLRESPONSES , GEOCODESFORNONPROD} from './mock-data';
import { Lokation, Jeocode, OneCallResponse } from './funTypes';
import { initialLokation, initialGeoCode, KNOWNGEOCODES } from './refData';

@Injectable({ providedIn: 'root' })
export class Nonprodweather extends Weather {

constructor(){
    super();
    console.log('Nonprodweather constructor running ... ' );

        effect(() => { //206
        const nonprodjeo = this.inputJeoForOneCallSig();
        if(nonprodjeo){
          console.log('//eff 206 and  nonprodjeo.name = '+ nonprodjeo.name );
        }
      });
      effect(() => { //207
        const ocr = this.oneCallForSearchResp();
        if(ocr){
          console.log('//eff 207 and ocr.lat = '+ ocr.lat );
        } else{
          console.log('//eff 207 ocr is undefined.');
        }
      });
  }

  override getFinalOneCallResponse(): () => OneCallResponse | undefined {
    console.log('208 getFinalOneCallResponse - this.oneCallForSearchResp()?.lat = '+ this.oneCallForSearchResp()?.lat );
    return this.oneCallForSearchResp;
  }

/*
   override getFinalJeoCode(): () => Jeocode | undefined {
     return this.saveJeoesult;
   }
*/
  
   override getOneCallResponseByJeo(): void {
    let result:WritableSignal<(OneCallResponse | undefined)> = signal(undefined);
    const jeoCode = this.inputJeoForOneCallSig();
    if(jeoCode && jeoCode.zip.length == 5 ){
      let ocr = ONECALLRESPONSES.find(ocr => ocr.lat == jeoCode.lat && ocr.lon == jeoCode.lon);      
      if (ocr && ocr.lat == jeoCode.lat){ 
        result.set(ocr);
        this.oneCallForSearchResp.set(ocr);   
        //this.setResponseFromOneCallSig
        this.setResponseFromOneCallSig(result);
        console.log('success! Nonprodweather getOneCallResponseByJeo Codefound the OCR for zip ' + jeoCode.zip);//TODO fin out why this is not making it back up to the creation of the search response ..');
      }
    }
    this.oneCallForSearchResp = result;
  }

   override getJeoCodeByUnKnownZipSig(): void { //TODO Add an array of UNKNOWNGEOCODESFORNONPROD to mock data to test this in non-prod mode
    //let result: WritableSignal<Jeocode | undefined> = signal(undefined);
    console.log(' Nonprodweather  getGeoCodeInfoFromZipWoKnownGeoCodes running...'); 
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