import { computed, effect, Injectable, Service, Signal, signal, WritableSignal } from '@angular/core';
import { Lokation, Jeocode, OneCallResponse } from './funTypes';
import { initialLokation, KNOWNGEOCODES } from './refData';

//@Service()
@Injectable({ providedIn: 'root' })
export abstract class Weather {

    constructor() { 
    }

    public lokationsSig: WritableSignal<(Lokation| undefined)[]> =signal(new Array<Lokation| undefined>);
    backFromMFiveDay:WritableSignal<boolean> = signal(false);
    inProgressGeoCodeSig:WritableSignal<Jeocode | undefined> = signal(undefined);
    inProgressOneCallResponseSig:WritableSignal<OneCallResponse | undefined> =signal(undefined);
    previousLokation:(Lokation | undefined) = initialLokation;
    startedSig:WritableSignal<boolean> = signal(false);

    abstract getOneCallResponseByJeoCode(joeCode:Jeocode):void;  
    abstract getGeoCodeInfoFromZipWoKnownGeoCodes(zipcode:WritableSignal<String | undefined>): WritableSignal<Jeocode | undefined>;

    /*
    lokationSig= computed(():(Lokation| undefined)  =>{
      const started = this.startedSig();
      const inProgressGeoCode = this.inProgressGeoCodeSig();
      const inProgressOneCallResponse = this.inProgressOneCallResponseSig();
      return started && inProgressGeoCode && inProgressGeoCode.zip.length ==5 && 
          inProgressOneCallResponse && inProgressOneCallResponse.lat != 0 ? 
          this.genLok(inProgressGeoCode,inProgressOneCallResponse) : this.handleUndefined(undefined)   ;  
    });
*/

    getLokationByZip(zipCodeSig:WritableSignal<String | undefined>): void {
      const zipCode =zipCodeSig();
      if(zipCode){
        this.getJeoCodeByZipCode(zipCodeSig);
      }
    }

    getJeoCodeByZipCode(zipCode:WritableSignal<String | undefined>): void{
      let result:WritableSignal<Jeocode | undefined> = signal(undefined);
      let knownGeo = this.getGeoCodeInfoFromZipWithKnownGeoCodes(zipCode);
      if(knownGeo){
        result = signal(knownGeo);
      }
      else{
        result = this.getGeoCodeInfoFromZipWoKnownGeoCodes(zipCode);
      }
      if(result && result()?.zip.length ==5 ){
        this.inProgressGeoCodeSig.set(result());
        console.log('success! Weather getJeoCodeByZipCode for the jeocode for '+zipCode());
        const jeo = result();
        if(jeo) {
          this.getOneCallResponseByJeoCode(jeo);
        }
      }
    }

    getGeoCodeInfoFromZipWithKnownGeoCodes(zipCodeSig:WritableSignal<String | undefined>): (Jeocode | undefined){
      let result:(Jeocode | undefined) = undefined;
      const zipCode = zipCodeSig();
      if(zipCode){
        result = KNOWNGEOCODES.find(kgc =>(kgc.zip == zipCode));
        console.log('success getGeoCodeInfoFromZipWithKnownGeoCodes found '+ zipCode);
      }
      return result;
    }

  removeOneCallResponse(bco:(Lokation | undefined)):void{
    
    this.lokationsSig.update(b => 
      b.filter(b => b && b.jeocode.zip !== bco?.jeocode.zip));
      
  }

    genLok(jeo:Jeocode,ocr:OneCallResponse): (Lokation | undefined){
      this.fixMainWeatherIconName(ocr);
      let lokation:Lokation = {
          jeocode: jeo,
          oneCallResponse: ocr,
          dt: new Date().getTime()
      };
      console.log('the list before: '+this.listToString(this.lokationsSig));
      this.lokationsSig.update(locs => [...locs,lokation]);
      console.log('the list after: '+this.listToString(this.lokationsSig));
      return lokation;
    }

    handleUndefined(u: (Lokation | undefined)): (Lokation | undefined){
      console.log('handleUndefined is running so the computed signal must be running.');
      return u;
    }

    listToString(arrSig:WritableSignal< (Lokation | undefined)[] >):string{
      let result = '';
      const arr = arrSig();
      if(arr && arr.length > 0){
        result = result + 'List: \n';
        arr.forEach(lok => { 
          result = result + lok?.jeocode.zip + '|' + lok?.dt + '\n';
        });
      }
      return result;
    }

    getOcrByGeoCode(jeo:Jeocode):(OneCallResponse | undefined){
      let result:(OneCallResponse | undefined) = undefined;
      const lokations = this.lokationsSig();
      let found = false;
      if (lokations && lokations.length > 0 ){
        lokations.forEach(lok => {
          if(lok?.jeocode.zip == jeo.zip){
            found = true;
            console.log(' successs! abstract weather service getOcrByGeoCode found lokation with zip '+lok.jeocode.zip);
            result = lok.oneCallResponse;
          }
        });
      }
      if(!found){
        console.warn(' abstract weather service getOcrByGeoCode NOT found lokation with zip '+jeo.zip);
      }
      return result;
    }

  fixMainWeatherIconName(ocr:OneCallResponse):void{
    ocr.data.forEach(da => {
      if(da.weather && da.weather.length > 0 ) {
          da.weather.forEach(w => {
            //console.log( 'xxxx main before: ' + w.main);
            w.main = this.getIconFrom(w.main);
            //console.log( 'xxxx main  after: ' + w.main);
          });
        }
    });
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


}
