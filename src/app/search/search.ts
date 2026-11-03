import { afterNextRender, Component,  computed,  effect,  ElementRef, inject, Signal, signal, viewChild, WritableSignal } from '@angular/core';

import { Location } from '../location/location';
import { FormsModule } from '@angular/forms';
import { Weather } from '../weather';
import { Jeocode, Lokation, SearchResponse } from '../funTypes';
import { initialSearchResponse } from '../refData';

@Component({
  imports: [FormsModule,Location],//, AsyncPipe],
  selector: 'app-search',
  styleUrl: './search.css',
  templateUrl: './search.html',
})
export class Search {

    weatherService = inject(Weather);
    newZip!: string;
    funcSig = signal('');
    tempZip!:string;

    lastSearchResponseSig:WritableSignal<SearchResponse | undefined> = signal(undefined);
    searchResponseSigsSig:WritableSignal<WritableSignal<SearchResponse | undefined> [] | undefined> = signal(new Array<WritableSignal<SearchResponse| undefined>>);
    searchResponseFromService: Signal<SearchResponse | undefined> = signal(undefined);

    myInput = viewChild<ElementRef<HTMLInputElement>>('zipCodeEntry');
    zipSig: WritableSignal<String | undefined> = signal(undefined);

  constructor(){
    afterNextRender( ()=> {
      if(this.weatherService.backFromFiveDay()){ //TODO deal with this
        console.log('Search constructor - back from five-day...');
        //this.refreshFromServer();
        this.weatherService.backFromFiveDay.set(false);
      }
      else{
        this.loadLocationsFromLocalStorage();
      }
    });

    effect(() =>{ //009           
          const searchResponseSig = this.weatherService.getSearchResponse; //this.searchResponseFromService ; // this.getSearchResponsFromService();
          const searchResponse = searchResponseSig();
          if(searchResponse && searchResponse.lokation && searchResponse.lokation.jeocode 
            && searchResponse.lokation.jeocode.zip && searchResponse.lokation.jeocode.zip.length ==5 ){
              //console.log(' - - - - - - eff 009 and the geo.name = '+searchResponse.lokation.jeocode.name);
              this.lastSearchResponseSig.set(searchResponse);
              console.log('- - - eff 009 saved the search respone from the service with a zip of '+searchResponse.lokation.jeocode.zip);
              this.newZip ='';
          }
      });
      
  }

    handleSaved():void{
      const searchResponse = this.lastSearchResponseSig();
      if(searchResponse){
        this.searchResponseSigsSig.update(arr => [...(arr || []), signal(searchResponse)]);
        //console.log('handleSaved finished and the number of entries in this.searchResponseSigsSig = ' + this.searchResponseSigsSig()?.length);      
      }
    }

  search(): void{ 
    this.handleSaved();
    this.funcSig.set('search');
      this.addNewLocation(this.newZip);    
      this.tempZip = this.newZip;
      
      //this.refreshFromServer(); //TODO and the else block below.
      /*
      }
    else {
      alert('The zip code of '+this.newZip+' is already in the list. ');
    }
      */
  }

  addNewLocation(zip: string): void {
    console.log('addNewLocation going for addNewLocation for zip: ' + zip+ ' ...');

      if (this.validateZip(zip) ) {
        //this.zipSig.set(zip); //: WritableSignal<String | undefined> = signal(zip);
        //this.searchResponseSig = this.weatherService.getLokationByZipSig(zipSig);     
        this.weatherService.setZzipSig(zip);
        let inProgressJeoCodeFromService = this.weatherService.getJeoCode();// getJeoCodeByUnKnownZipSig(this.zipSig);   
        
        //this.weatherService.setInputJeoForOneCallSig(inProgressJeoCodeFromService);
        this.weatherService.getOneCallResponseByJeo();   

        this.searchResponseFromService = this.getSearchResponsFromService()
        
      }
      else {
        console.error('ERROR! ' + zip + ' zip is not valid');
        alert('zip ' + zip + ' is not valid. It needs to be 5 numbers only.');        
      }
  }

  getSearchResponsFromService(): Signal<SearchResponse | undefined>{
    let result: Signal<SearchResponse | undefined> = signal(undefined);
    if(this.newZip != undefined && this.newZip.length == 5){
      this.searchResponseFromService = this.weatherService.getSearchResponse;
      result = this.searchResponseFromService;
    }
    return result;
  }

  removeLocation(zip:string):void{  //TODO work on this
    /*
    let target: SearchResponse | undefined;
    this.searchResponsez.forEach(r =>{
      if(r.lokation.jeocode.zip == zip){
        target = r;
      }
    });
    if(target){
      let ind = this.searchResponsez.findIndex((r:SearchResponse) => {return target?.lokation.jeocode.zip == r.lokation.jeocode.zip});
      this.searchResponsez.splice(ind,1);
      this.searchResponsesSig.update(srs => {srs = [...this.searchResponsez]; return {...srs} });
    }
    //this.refreshFromServer();
    */
  }

  validateZip(unVaidatedZip: string): boolean {
    let result = false;
    result = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(unVaidatedZip);
    return result;
  }

    findIndexByZip(bcors: (Lokation | undefined)[],zip:String): number{
    //console.log(' findIndexByZip checking to see if '+zip+' is already in the array...');
    let result = -1;
    let ind = 0;
    bcors.forEach(bcor => { 

      if( zip == bcor?.jeocode.zip){
        result = ind;
      }
      ind++;
    });
    //console.log(' -- findIndexByZip index = ' + result);
    return result;
  }

  loadLocationsFromLocalStorage(): void {

    this.funcSig.set('localStorage');
    let delay = 250;
    
    for (const localStorageKey in localStorage) {
          
        if (localStorageKey.startsWith('storedZipCode')){  
            const derivedZip =  localStorage.getItem(localStorageKey);             
            delay = delay +250;              
            if(derivedZip){
              console.log('loadLocationsFromLocalStorage Going for addNewLocation for '+derivedZip); 
              setTimeout(()=>{         //TODO remember to deal with this!         
                this.addNewLocation(derivedZip);  
               },delay);             
            }
            else{
              //console.log('loadLocationsFromLocalStorage not handling '+ derivedZip+'' + ' locs = ' + locs + ' locs.length = '+ locs.length + ' ind = ' + ind);              
            }
        }
    }
    //this.refreshFromServer();
  }

}
