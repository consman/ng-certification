import { computed, effect, Injectable, Service, Signal, signal, WritableSignal } from '@angular/core';
import { Lokation, Jeocode, OneCallResponse, SearchResponse } from './funTypes';
import { initialGeoCode, initialLokation, initialOneCallResponse, KNOWNGEOCODES } from './refData';

@Injectable({ providedIn: 'root' })
export abstract class Weather {

    constructor() { 
    }

    inProgressZipSig:WritableSignal<String | undefined> = signal(undefined);
    searchResponses:SearchResponse [] = [];
    backFromFiveDay:WritableSignal<boolean> = signal(false); //TODO work on this

    abstract getJeoCodeByUnKnownZipSig(zip:string): WritableSignal<Jeocode | undefined>;

        getJeoCode(zip: string): WritableSignal<Jeocode | undefined>{ // this would go in the abstract class 
        let result : WritableSignal<Jeocode | undefined> = signal(undefined);
        if (zip && zip.length == 5){ //This totally needs to be reworked
            const joeCodeKSig = this.getJeoCodeByKNOWNZipSig(zip);
            const jeoCodeK = joeCodeKSig();
            if ( jeoCodeK && jeoCodeK.zip.length == 5 ) {
                return joeCodeKSig;
            }
            else { // return the resource value                
                return  this.getJeoCodeByUnKnownZipSig(zip);
            }
        } else{
            console.warn('getJeoCode called with a bad zip - either undefined or not a length of 5 .');
        }

        if(result() == undefined){
            console.warn('Bummer unable to get the geoCode one way or another');
        }
        return result;      
    }


    getJeoCodeByKNOWNZipSig(zip: string): WritableSignal<Jeocode | undefined> { 
      let result : WritableSignal<Jeocode | undefined> = signal(undefined);
      if (zip && zip.length == 5){
          let jeoK = KNOWNGEOCODES.find(kgc =>(kgc.zip == zip));
          if(jeoK){
              console.log('success getJeoCodeByKNOWNZipSig found '+ zip);
              result = signal(jeoK);
          }
          else {
              console.log('getJeoCodeByKNOWNZipSig unable to get the geoCode from KNOWN - hoping to run getJeoCodeByUnKnownZipSig .');
              result = signal(undefined);
          }
      }
      else{
          console.warn('getJeoCodeByKNOWNZipSig called with a bad zip - either undefined or not a length of 5 .');
      }    
      return result;   
  }

    
  /*  
    getLokationByZipSig(zipcode:WritableSignal<String | undefined>):WritableSignal<SearchResponse | undefined>{
      let result:WritableSignal<SearchResponse | undefined> = signal(undefined);

      const zip = zipcode();
      if (zip){
        this.inProgressZipSig.set(zip);
        let jeoCodeSig = this.getJeoCodeByUnKnownZipSig(this.inProgressZipSig);

        const searchResponse = { lokation: {
            jeocode: jeoCodeSig(),
            oneCallResponse: initialOneCallResponse,
            dt: new Date().getTime()
          }, 
        lokationsCount:this.searchResponses.length+1,  
        messageFromServer:'Good job!', 
        success:true};
        if(searchResponse){
          result.set(searchResponse);
        }
      }
      return result;
    }
*/


/*
    getLokationByZipSig(zipcode:WritableSignal<String | undefined>):WritableSignal<SearchResponse | undefined>{
      let result:WritableSignal<SearchResponse | undefined> = signal(undefined);
      const zip = zipcode();
      if (zip){
        this.inProgressZipSig.set(zip);
        const searchResponse = this.searchResponseComp();
        if(searchResponse){
          result.set(searchResponse);
        }
      }
      return result;
    }

    abstract getJeoCodeByUnKnownZipSig(zipcode:WritableSignal<String | undefined>): WritableSignal<Jeocode | undefined>;
    //abstract getOneCallResponseByJeoCode(joeCode:Signal<Jeocode | undefined>):WritableSignal<OneCallResponse | undefined>;  

    inProgressSearchResponseComp = computed(():(SearchResponse | undefined) => {
      let result = undefined;
      const inProgressZip = this.inProgressZipSig();
      const jeoCodeSig = this.getJeoCodeByUnKnownZipSig(this.inProgressZipSig); //wrong use computed to determine next 2
      const jeoCode = jeoCodeSig();

      return jeoCode ? { lokation: {
            jeocode: jeoCode,
            oneCallResponse: initialOneCallResponse,
            dt: new Date().getTime()
          }, 
        lokationsCount:this.searchResponses.length+1,  
        messageFromServer:'Good job!', 
        success:true} : undefined ;

    });
  */
/*

    inProgressSearchResponseComp = computed(():(SearchResponse | undefined) => {
      //let result = undefined;
      const jeoCodeSig = this.getJeoCodeByZipCodeComp; //wrong use computed to determine next 2
      const ocrSig = this.getOneCallResponseByJeoCode(jeoCodeSig);//this.inProgressOneCallResponseSig();
      const jeoCode = jeoCodeSig();
      const ocr = ocrSig();

      return jeoCode && ocr && jeoCode.lat == ocr.lat ? { lokation: {
            jeocode: jeoCode,
            oneCallResponse: this.fixMainWeatherIconName(ocr),
            dt: new Date().getTime()
          }, 
        lokationsCount:this.searchResponses.length+1,  
        messageFromServer:'Good job!', 
        success:true} : undefined;

    });

  getJeoCodeByZipCodeComp = computed(():(Jeocode | undefined) => {
    const geoFromKnown =  this.getGeoCodeInfoFromZipWithKnownGeoCodes(this.inProgressZipSig);
    const geoFromUnKnown = this.getGeoCodeInfoFromZipWoKnownGeoCodes(this.inProgressZipSig); 
    return geoFromKnown || geoFromUnKnown() ? (geoFromKnown ? geoFromKnown : geoFromUnKnown()) : undefined;
  });

  getGeoCodeInfoFromZipWithKnownGeoCodes(zipCodeSig:WritableSignal<String | undefined>): (Jeocode | undefined){
    let result:(Jeocode | undefined) = undefined;
    const zipCode = zipCodeSig();
    if(zipCode){
      result = KNOWNGEOCODES.find(kgc =>(kgc.zip == zipCode));
      if(result) {
        console.log('success getGeoCodeInfoFromZipWithKnownGeoCodes found '+ zipCode);
      }
    }
    return result;
  }

  fixMainWeatherIconName(prevOcr:OneCallResponse):OneCallResponse{
    let ocr:OneCallResponse = prevOcr;
    ocr.data.forEach(da => {
      if(da.weather && da.weather.length > 0 ) {
          da.weather.forEach(w => {
            //console.log( 'xxxx main before: ' + w.main);
            w.main = this.getIconFrom(w.main);
            //console.log( 'xxxx main  after: ' + w.main);
          });
        }
    });
    return ocr;
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

  getExistingSearchResponseByGeoCode(jeo:Jeocode):SearchResponse | undefined {
    let result = undefined;
    let found = false;
    this.searchResponses.forEach(sr => {
      if(sr.lokation.jeocode.lat == jeo.lat){
        found = true;
        result = sr;
      }
    });
    console.log('weather getExistingSearchResponseByGeoCode  = ' + found);
    return result;
  }

  printSearchResponses(srs:SearchResponse []):string{
    let result ='';//'List:';
    if(srs && srs.length > 0){
      result ='List:\n';
      srs.forEach(srs =>{
        result = result + srs.lokation.jeocode.zip+'|'+srs.lokation.jeocode.name+'|'+srs.lokation.oneCallResponse.lat+ '\n';
      });
  }
    return result;
  }

  removeOneCallResponse(lok:(Lokation | undefined)):void{

    console.log('the list before removing an entry: ' + this.printSearchResponses(this.searchResponses)); //+this.listToString(this.lokationsSig));
    let newArr = this.searchResponses.filter(sr => sr.lokation.jeocode.lat != lok?.jeocode.lat);
    this.searchResponses = newArr;

    console.log('the list after removing an entry: '+ this.printSearchResponses(this.searchResponses));  
    
    if (lok && lok.jeocode && lok.jeocode.zip && lok.jeocode.zip.length ==5 && null != this.getZipLocalStorageKey(lok.jeocode.zip)){
        localStorage.removeItem('storedZipCode'+lok.jeocode.zip);
    } 
    else{
      console.warn('weather removeOneCallResponse invalid zip provided when trying to remove from local storage! lok?.jeocode.zip = '+ lok?.jeocode.zip);
    }
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

  getSearchResponsesSig():WritableSignal<SearchResponse[]>{
    console.log('weather getSearchResponsesSig - this.searchResponses.length = ' + this.searchResponses.length);
    console.log('weather getSearchResponsesSig - this.searchResponses:' + this.printSearchResponses(this.searchResponses));
    return signal(this.searchResponses);
  }

      effect(() =>{
        const inProgressSearchResponse = this.inProgressSearchResponseComp();
        if (inProgressSearchResponse 
          && inProgressSearchResponse.lokation 
          && inProgressSearchResponse.lokation.jeocode 
          &&inProgressSearchResponse.lokation.jeocode.zip 
          && inProgressSearchResponse.success){
            localStorage.setItem('storedZipCode' + (inProgressSearchResponse.lokation.jeocode.zip), inProgressSearchResponse.lokation.jeocode.zip);
            this.searchResponses.push(inProgressSearchResponse);
        }
      });

      effect(() => { // 002
        const inProgressSearchResponseSig = this.inProgressSearchResponseComp;
        const inProgressSearchResponse = inProgressSearchResponseSig();
        if(inProgressSearchResponse){
          console.log('eff 002 in weather.ts says inProgressSearchResponse ='
            +inProgressSearchResponse.success
            +'|'+inProgressSearchResponse.messageFromServer
            +'|'+inProgressSearchResponse.lokation.jeocode.zip);
        }
      });

      effect(() =>{ //003
        const jeocode = this.getJeoCodeByZipCodeComp();
        const zip = this.inProgressZipSig()
        if (zip && (!jeocode || !jeocode.zip)) {
          alert('The zip code, '+this.inProgressZipSig()+', is formatted OK, but no data is returned.');
        }
      });



*/
}
