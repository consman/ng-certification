import { effect, Injectable, Service, Signal, signal, WritableSignal } from '@angular/core';
import { BobsCompositeOcr, Jeocode, OneCallResponse } from './funTypes';

//@Service()
@Injectable({ providedIn: 'root' })
export abstract class Weather {

    constructor() { 
    }

/* 
A) use the zip to try to get the geo 
A_1) try from from known geo codes first
A_2) if that does not work, try calling the service "WoKnown"
B) you have arrived here if and only if you have a valid JeoCode - use the oneCall Serve to get the OnCall Response Sig

*/

    public bobsCompositeOcrsSig: WritableSignal<WritableSignal<BobsCompositeOcr | undefined>[]> =signal(new Array<WritableSignal<BobsCompositeOcr>>);
    //currentZipSig:WritableSignal<String | undefined>=signal('');

    //abstract getFiveDayForecastFromService(lat: number, lon: number): Observable<Forecast>;
    abstract getGeoCodeInfoFromZipWoKnownGeoCodes(zipcode:WritableSignal<String | undefined>): WritableSignal<Jeocode | undefined>;
    abstract getOneCallResponseByZip(zipcode:WritableSignal<String | undefined>): void; //WritableSignal<WritableSignal<BobsCompositeOcr | undefined>[]>;
    abstract getGeoCodeInfoFromZipWithKnownGeoCodes(zipcode:WritableSignal<String | undefined>): void;//WritableSignal<Jeocode | undefined>;

    doneWithPushSig: WritableSignal<boolean> = signal( false);
    backFromMFiveDay: WritableSignal<boolean> = signal( false);
/*
      addToArray(arr:WritableSignal<BobsCompositeOcr | undefined>[] , bcor:WritableSignal<BobsCompositeOcr | undefined>)  :WritableSignal<BobsCompositeOcr | undefined>[] {
        let result = new Array<WritableSignal<BobsCompositeOcr| undefined>>;
        arr.forEach(b=>{ result.push(b)});
    
        result.push(bcor);
        return result;
      }
  */
  removeOneCallResponse(bco:WritableSignal<BobsCompositeOcr | undefined>):void{
    console.log('this.bobsCompositeOcrsSig.length before: '+this.bobsCompositeOcrsSig.length);
    this.bobsCompositeOcrsSig.update(b => 
      b.filter(item => item()?.jeocode.zip !== bco()?.jeocode.zip));
    console.log('this.bobsCompositeOcrsSig.length after: '+this.bobsCompositeOcrsSig.length);  
  }

getExistingBcocrFromMainList(zipcode:string):WritableSignal<BobsCompositeOcr | undefined> {
  let result:WritableSignal<BobsCompositeOcr | undefined> = signal(undefined);
  //let ocr = ONECALLRESPONSES.find(ocr => ocr.lat == geoCode.lat && ocr.lon == geoCode.lon);
  const mainList = this.bobsCompositeOcrsSig();
  let found = false;
  //const zip = zipcode();
  //console.log('getExistingBcocrFromMainList - zip = ' + zipcode);
  if(mainList && mainList.length > 0 && zipcode){
    //console.log('getExistingBcocrFromMainList -  mainList.length = '+  mainList.length);
    mainList.forEach(bSig=> {
      const b = bSig()
      if (!found && b?.jeocode.zip == zipcode){
        //console.log('getExistingBcocrFromMainList in for each loop b?.jeocode.zip = ' + b?.jeocode.zip) 
        result = bSig;
        found = true;
      }      
    });
  }
  //console.log('getExistingBcocrFromMainList returning result()?.jeocode.zip : ' + result()?.jeocode.zip);
  return result;
}


echoArraySize():void{
  console.log('weather service says this.bobsCompositeOcrsSig().length = ' + this.bobsCompositeOcrsSig().length);
}

}
