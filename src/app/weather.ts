import { computed, effect, Injectable, Service, Signal, signal, WritableSignal } from '@angular/core';
import { Lokation, Jeocode, OneCallResponse, SearchResponse } from './funTypes';
import { initialGeoCode, initialLokation, initialOneCallResponse, initialSearchResponse, KNOWNGEOCODES } from './refData';

@Injectable({ providedIn: 'root' })
export abstract class Weather {

    constructor() { 
      /*
      effect(() => { //200
        const getFinalOneCallResponseSigSig = this.getFinalOneCallResponse();
        const getFinalOneCallResponseSig = getFinalOneCallResponseSigSig;
        const getFinalOneCallResponse = getFinalOneCallResponseSig();
        if(getFinalOneCallResponse){
          //console.log(' eff 200 and getFinalOneCallResponse.lat = ' + getFinalOneCallResponse.lat);
          //this.otherOneCallResponse.set(getFinalOneCallResponse);
        }        
      });
      
      effect(() => { //500
        const sr = this.getSearchResponse();
        if(sr){
          console.log(' **** eff 500 Success sr.lokation.oneCallResponse.lat = ' +sr.lokation.oneCallResponse.lat+ ' and sr.lokation.jeocode.zip = '+ sr.lokation.jeocode.zip);
        }
        else {
          console.log(' **** eff 500 Bummer getSearchResponseis still undefined. ' );
        }
      });
      */
    }

    inProgressZipSig:WritableSignal<String | undefined> = signal(undefined);
    srCount = 0;
    backFromFiveDay:WritableSignal<boolean> = signal(false); 
    known:boolean =false;

    oneCallForSearchResp: WritableSignal<(OneCallResponse | undefined)> = signal(undefined);
    //otherOneCallResponse: WritableSignal<(OneCallResponse | undefined)> = signal(undefined);

    abstract getJeoCodeByUnKnownZipSig():void;
    abstract getOneCallResponseByJeo():void;
    abstract getFinalOneCallResponse(): () => OneCallResponse | undefined;

    protected zzipSig:WritableSignal<String | undefined>= signal(undefined);
    protected inputJeoForOneCallSig: WritableSignal <Jeocode | undefined> = signal(undefined);
    protected responseFromOneCallSig: WritableSignal <OneCallResponse | undefined> = signal(undefined);

    protected searchResponseSigsSigForFiveDay:WritableSignal<WritableSignal<SearchResponse | undefined> [] | undefined> = signal(new Array<WritableSignal<SearchResponse| undefined>>);

    getFinalJeoCode():  () => Jeocode | undefined {return this.inputJeoForOneCallSig() ? this.inputJeoForOneCallSig :  signal(undefined)};
    
    getFocr():WritableSignal<OneCallResponse | undefined>{
      const getFinalOneCallResponseSigSig = this.getFinalOneCallResponse();
        const getFinalOneCallResponseSig = getFinalOneCallResponseSigSig;
        const getFinalOneCallResponse = getFinalOneCallResponseSig();
        if(getFinalOneCallResponse){
          //console.log(' getFocr 600 and getFinalOneCallResponse.lat = ' + getFinalOneCallResponse.lat);
          //this.otherOneCallResponse.set(getFinalOneCallResponse);
        }
        return signal(getFinalOneCallResponse);
    }

    setSearchResponseSigsSigForFiveDay(inSig:WritableSignal<WritableSignal<SearchResponse | undefined> [] | undefined>):void{
      this.searchResponseSigsSigForFiveDay = inSig;
    }
    getSearchResponseSigsSigForFiveDay():WritableSignal<WritableSignal<SearchResponse | undefined> [] | undefined>{
      return this.searchResponseSigsSigForFiveDay;
    }

    setZzipSig(zip:string):void{
      this.zzipSig.set(zip);
    }

    setInputJeoForOneCallSig(ijfoc: WritableSignal <Jeocode | undefined>):void{      
      const jeo = ijfoc();
      if(jeo){
        //console.log('setInputJeoForOneCallSig running ...  and jeo.zip = ' +jeo.zip );    
      }
      else{
        //console.log('setInputJeoForOneCallSig running ... but with undefined. :( ');
      }
      this.inputJeoForOneCallSig = ijfoc; // .set(ijfoc());
    }

    setResponseFromOneCallSig(ocrSig:WritableSignal <OneCallResponse | undefined>):void{
      this.responseFromOneCallSig = ocrSig;
    }

    prOcr(ocr:OneCallResponse | undefined):OneCallResponse | undefined{
      //console.log(' prOcr Inside getSearchResponse and the oneCallResponse.lat = ' + ocr?.lat)
      return ocr;
    }

    getSearchResponse = computed(():(SearchResponse | undefined) => {

      const jeoCode = this.getFinalJeoCode()(); 
      const oneCallResponse =  this.prOcr(this.getFocr()()); //this.prOcr(this.getFinalOneCallResponse()()) ;

      return jeoCode && 
      oneCallResponse && oneCallResponse.lat == jeoCode.lat ?
        { lokation: {
            jeocode: jeoCode,
            oneCallResponse: this.fixMainWeatherIconName(oneCallResponse),
            dt: new Date().getTime()
          }, 
        lokationsCount:this.srCount++,  
        messageFromServer: this.handleMessageFromServer('Good job!'), 
        success:true} 
        : undefined;
    });

    handleMessageFromServer(mess:string):string {
      //console.log(' We made it to the end. mess = ' + mess);
      return mess;
    }

    getJeoCode(): void{ 
      let result : WritableSignal<Jeocode | undefined> = signal(undefined);
      const zip = this.zzipSig();
      if (zip && zip.length == 5){ 
          const joeCodeKSig = this.getJeoCodeByKNOWNZipSig();
          const jeoCodeK = joeCodeKSig();
          if ( jeoCodeK && jeoCodeK.zip.length == 5 ) { 
            this.known = true;
            this.setInputJeoForOneCallSig(joeCodeKSig);
            this.known = false;
          }
          else { // return the resource value     
            if(!this.known){
              this.getJeoCodeByUnKnownZipSig();                            
            }             
          }          
      } else{
          console.warn('getJeoCode called with a bad zip - either undefined or not a length of 5 .');
      }      
  }

    getJeoCodeByKNOWNZipSig(): WritableSignal<Jeocode | undefined> { 
      let result : WritableSignal<Jeocode | undefined> = signal(undefined);
      const zip = this.zzipSig();
      if (zip && zip.length == 5){
          let jeoK = KNOWNGEOCODES.find(kgc =>(kgc.zip == zip));
          if(jeoK){
              //console.log('success getJeoCodeByKNOWNZipSig found '+ zip);
              result = signal(jeoK);
          }
          else {
              //console.log('getJeoCodeByKNOWNZipSig unable to get the geoCode from KNOWN - hoping to run getJeoCodeByUnKnownZipSig .');
              result = signal(undefined);
          }
      }
      else{
          console.warn('getJeoCodeByKNOWNZipSig called with a bad zip - either undefined or not a length of 5 .');
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
    
}
