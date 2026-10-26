import { afterNextRender, Component,  computed,  ElementRef, inject, Signal, signal, viewChild, WritableSignal } from '@angular/core';

import { Location } from '../location/location';
import { FormsModule } from '@angular/forms';
import { Weather } from '../weather';
import { Lokation, SearchResponse } from '../funTypes';
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
    searchResponseSig:Signal<SearchResponse | undefined> = signal(undefined);
    searchResponsesSig:WritableSignal<(SearchResponse[] | undefined)> = signal(new Array<SearchResponse>);
    searchResponsez:SearchResponse[] = new Array<SearchResponse>;
    myInput = viewChild<ElementRef<HTMLInputElement>>('zipCodeEntry');

  constructor(){
    afterNextRender( ()=> {
      if(this.weatherService.backFromFiveDay()){
        console.log('Search constructor - back from five-day...');
        this.refreshFromServer();
        this.weatherService.backFromFiveDay.set(false);
      }
      else{
        this.loadLocationsFromLocalStorage();
      }
    });
  }

  removeLocation(zip:string):void{
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
    this.refreshFromServer();
  }

  refreshFromServer():void{
    setTimeout(()=>{ 
      //console.log('this.weatherService.getSearchResponsesSig()().length = ' + this.weatherService.getSearchResponsesSig()().length);
      const srSig = this.weatherService.getSearchResponsesSig();
      const sr = srSig();

      this.searchResponsez.length = 0;
      sr.forEach(item =>{
        this.searchResponsez.push(item);
      });
      console.log('number of searchResponsez = ' + this.searchResponsez.length);
      this.searchResponsez.forEach(sr => {
        console.log('   - sr.lokation.jeocode.zip = '+sr.lokation.jeocode.zip);
      });
      this.searchResponsesSig.set(this.searchResponsez);
      console.log('Search removeLocation - removal complete. number of searchResponsez = ' + this.searchResponsez.length);

      const inputElement = this.myInput()?.nativeElement;
        if (inputElement) {
          inputElement.focus();
          inputElement.value = ' ';
          inputElement.dispatchEvent(new Event('input', { bubbles: true }));
          inputElement.value = '';
          inputElement.dispatchEvent(new Event('input', { bubbles: true }));
          inputElement.focus();
        }          
    },250);
  }

  search(): void{ 
    this.funcSig.set('search');
    let fResult = this.searchResponsez.find(sr => sr.lokation.jeocode.zip === this.newZip);
    console.log('find(sr =>{sr.lokation.jeocode.zip == this.newZip}) = ' + fResult);            

    if (fResult == undefined) {
      this.addNewLocation(this.newZip);    
      this.tempZip = this.newZip;
      this.newZip ='';
      this.refreshFromServer();
      }
    else {
      alert('The zip code of '+this.newZip+' is already in the list. ');
    }
  }

  addNewLocation(zip: string): void {
    console.log('addNewLocation going for addNewLocation for zip: ' + zip+ ' ...');

      if (this.validateZip(zip) ) {
        let zipSig: WritableSignal<String | undefined> = signal(zip);
        this.searchResponseSig = this.weatherService.getLokationByZipSig(zipSig);        
      }
      else {
        console.error('ERROR! ' + zip + ' zip is not valid');
        alert('zip ' + zip + ' is not valid. It needs to be 5 numbers only.');        
      }
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
    this.refreshFromServer();
  }

}
