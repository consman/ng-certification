import { Service, signal, WritableSignal } from '@angular/core';
import { Weather } from './weather';
import { filter, from, Observable, of } from 'rxjs';
//import { RAWFORECASTS, RAWLOCATIONS } from './mock-data';
import { ONECALLRESPONSES } from './mock-data';
import { HttpErrorResponse } from '@angular/common/http';
import { Forecast } from './forecast';
import {LocationT} from './location';
import { BobsCompositeOcr } from './funTypes';

@Service()
export class Nonprodweather extends Weather {

    constructor() { 
    super();

  }
  override getOneCallResponseByZip(zipcode: WritableSignal<String | undefined>): WritableSignal<BobsCompositeOcr | undefined> {
    let result:WritableSignal<BobsCompositeOcr | undefined> = signal(undefined);
    let jeo = this.getGeoCodeInfoFromZip(zipcode);
    const jeoc = jeo();
    if(jeoc) {
      if(ONECALLRESPONSES.filter(ocr => ocr.lat == jeoc.lat && ocr.lon == jeoc.lon).length == 0 ){
        alert('The zip code, ' + zipcode() + ', is formatted OK, but no data is returned.'); 
      }
      else {
        let ocr = ONECALLRESPONSES.find(ocr => ocr.lat == jeoc.lat && ocr.lon == jeoc.lon);
        if(ocr){
         let newBcr:BobsCompositeOcr = {jeocode:jeoc, oneCallResponse:ocr, dt: new Date().getTime()}
         result.set(newBcr);
         this.addOneCallResponse(result);
        }
      }
    }
    return result;
}
  //  abstract getLocationFromService(zipcode:WritableSignal<String | undefined>): WritableSignal<LocationT | undefined>; 
/*
  override getLocationFromService(zipcode: WritableSignal<String | undefined>): WritableSignal<LocationT | undefined> {
    //console.log('NON-PROD weather service getting location for zip: ' + zipcode());
 
       if ( RAWLOCATIONS.filter(loc => loc.zip == zipcode()).length == 0){
         //console.log('NON-PROD weather service -- location not found for '+ zipcode());
         //const error = new HttpErrorResponse({ status: 404 });
         
         alert('The zip code, ' + zipcode() + ', is formatted OK, but no data is returned.'); 
         
         return signal(undefined);//of(error) as any;
       }
       else{
        //console.log('NON-PROD weather service -- found at least one for '+ zipcode());
       }
       let rawResult:LocationT | undefined = RAWLOCATIONS.find(loc => loc.zip === zipcode());
       //console.log(' NonprodweatherService rawResult?.zip = ' + rawResult?.zip);

       let result: WritableSignal<LocationT | undefined> = signal(rawResult);
       //console.log(' NonprodweatherService result()?.zip = ' + result()?.zip);
       
       return result;
  }
*/
/*
  override getFiveDayForecastFromService(lat: number, lon: number): Observable<Forecast> {
    //console.log('NON-PROD weather service getFiveDayForecastsFromService for lat: ' + lat);
     return from(RAWFORECASTS).pipe(filter(forc => forc.lat === lat && forc.lon === lon));   
    }
     */
}