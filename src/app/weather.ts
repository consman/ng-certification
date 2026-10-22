import { computed, effect, Injectable, Service, Signal, signal, WritableSignal } from '@angular/core';
import { Lokation, Jeocode, OneCallResponse } from './funTypes';
import { initialGeoCode, initialLokation, KNOWNGEOCODES } from './refData';

//@Service()
@Injectable({ providedIn: 'root' })
export abstract class Weather {

    constructor() { 
    }

    public lokationsSig: WritableSignal<(Lokation| undefined)[]> =signal(new Array<Lokation| undefined>);
    backFromMFiveDay:WritableSignal<boolean> = signal(false);
    inProgressGeoCodeSig:WritableSignal<Jeocode | undefined> = signal(undefined);
    inProgressOneCallResponseSig:WritableSignal<OneCallResponse | undefined> =signal(undefined);

    abstract getOneCallResponseByJeoCode(joeCode:Jeocode):void;  
    abstract getGeoCodeInfoFromZipWoKnownGeoCodes(zipcode:WritableSignal<String | undefined>): WritableSignal<Jeocode | undefined>;

    getLokationByZip(zipCodeSig:WritableSignal<String | undefined>): void {
      const zipCode =zipCodeSig();
      if(zipCode){
        if(!this.zipAlreadyInList(zipCode)){
          this.getJeoCodeByZipCode(zipCodeSig);
        }
        else{
          alert('The zip code of '+zipCode+' is already in the list. ');
        }
      }
    }

    zipAlreadyInList(zipCode:String):boolean {
      let result = false;
      let geo: Jeocode = {zip: zipCode+'',name: '', lat: 0, lon: 0, country: ''};
      let existing = this.getExistingOcrByGeoCode(geo);
      if (existing){
        result = true;
      }
      return result;
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
      else{
        console.warn('weather getJeoCodeByZipCode - still cannot get a valid zip code: '+ zipCode());
        alert('The zip code, '+zipCode()+', is formatted OK, but no data is returned.');
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

  removeOneCallResponse(lok:(Lokation | undefined)):void{
    console.log('the list before removing an entry: '+this.listToString(this.lokationsSig));
    this.lokationsSig.update(b => 
      b.filter(b => b && b.jeocode.zip !== lok?.jeocode.zip));
    console.log('the list after removing an entry: '+this.listToString(this.lokationsSig));    
    
    if (lok && lok.jeocode && lok.jeocode.zip && lok.jeocode.zip.length ==5 && null != this.getZipLocalStorageKey(lok.jeocode.zip)){
        localStorage.removeItem('storedZipCode'+lok.jeocode.zip);
    } 
    else{
      console.warn('weather removeOneCallResponse invalid zip provided when trying to remove from local storage! lok?.jeocode.zip = '+ lok?.jeocode.zip);
    }
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

    localStorage.setItem('storedZipCode' + (jeo.zip), jeo.zip);
    return lokation;
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

    getExistingOcrByGeoCode(jeo:Jeocode):(OneCallResponse | undefined){
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

    getZipLocalStorageKey(zipcode: string): string {
    let result = null;
    for (const localStorageKey in localStorage) {
      if (localStorageKey.startsWith('storedZipCode')){
        if (localStorage.getItem(localStorageKey) === zipcode){
          result = localStorageKey;
        }
      }
    }
    if ( null == result){
      result = '';
    }
    return result;
  }


}
