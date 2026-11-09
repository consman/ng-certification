import {  signal, WritableSignal , Injectable, Signal, effect} from '@angular/core';
import { Weather } from './weather';
import { ONECALLRESPONSES , UNKNOWNGEOCODESFORNONPROD} from './mock-data';
import { Lokation, Jeocode, OneCallResponse } from './funTypes';
import { initialLokation, initialGeoCode, KNOWNGEOCODES } from './refData';

@Injectable({ providedIn: 'root' })
export class Nonprodweather extends Weather {

constructor(){
    super();
    //console.log('Nonprodweather constructor running ... ' );

        effect(() => { //206
        const nonprodjeo = this.inputJeoForOneCallSig();
        if(nonprodjeo){
          //console.log('//eff 206 and  nonprodjeo.name = '+ nonprodjeo.name );
        }
      });
      effect(() => { //207
        const ocr = this.oneCallForSearchResp();
        if(ocr){
          //console.log('//eff 207 and ocr.lat = '+ ocr.lat );
        } else{
          //console.log('//eff 207 ocr is undefined.');
        }
      });
      
  }

  override getFinalOneCallResponse(): () => OneCallResponse | undefined {
    //console.log('getFinalOneCallResponse NON PROD - this.oneCallForSearchResp()?.lat = '+ this.oneCallForSearchResp()?.lat );
    return this.oneCallForSearchResp;
  }

   override getOneCallResponseByJeo(): void {
    let result:WritableSignal<(OneCallResponse | undefined)> = signal(undefined);
    //console.log('208 > > > Nonprodweather getOneCallResponseByJeo starting.');
    const jeoCode = this.inputJeoForOneCallSig();
    if(jeoCode && jeoCode.zip.length == 5 ){
      let ocr = ONECALLRESPONSES.find(ocr => ocr.lat  == (Math.round(jeoCode.lat*10000)/10000) && ocr.lon == (Math.round(jeoCode.lon*10000)/10000));      
      if (ocr && ocr.lat == (Math.round(jeoCode.lat*10000)/10000)){ 
        result.set(ocr);
        this.oneCallForSearchResp.set(ocr);   
        //this.setResponseFromOneCallSig
        this.setResponseFromOneCallSig(result);
        //console.log('208 > > > success! Nonprodweather getOneCallResponseByJeo Codefound the OCR for zip ' + jeoCode.zip + ' and result = ' + result()?.lat);
      }
    }
    this.oneCallForSearchResp = result;
  }

   override getJeoCodeByUnKnownZipSig(): void { 
    let result: WritableSignal<Jeocode | undefined> = signal(undefined);
    //console.log(' Nonprodweather  getJeoCodeByUnKnownZipSig running...'); 
    let found = false;
    const zip = this.zzipSig();
    if(zip){
      UNKNOWNGEOCODESFORNONPROD.forEach(g => {
      if(g.zip == zip){
        result.set(g);
        this.setInputJeoForOneCallSig(result);
        found = true;
        //console.log('success! Nonprodweather  getJeoCodeByUnKnownZipSig found geo for ' + zip);
      }
    });
    if(!found){
      alert('The zip code, '+zip+', is formatted OK, but no data is returned.');
    }
    }   
  }

  //saveJeoesult: WritableSignal<Jeocode | undefined> = signal(undefined);
  
}