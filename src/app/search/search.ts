import { afterNextRender, Component, computed, effect, ElementRef, inject, Signal, signal, viewChild, WritableSignal } from '@angular/core';

import { Location } from '../location/location';
import { FormsModule } from '@angular/forms';
import { Weather } from '../weather';
import { Lokation } from '../funTypes';
import { initialLokation } from '../refData';

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


  constructor(){
    afterNextRender( ()=> {
      if(this.weatherService.backFromMFiveDay()){
        this.weatherService.backFromMFiveDay.set(false);
      }
      else{
        this.loadLocationsFromLocalStorage();
      }
    });
  }


  search(): void{ 
    this.funcSig.set('search');
    this.addNewLocation(this.newZip);
  }

  addNewLocation(zip: string): void {
    console.log('addNewLocation going for addNewLocation for zip: ' + zip+ ' ...');

      if (this.validateZip(zip) ) {
        let zipSig: WritableSignal<String | undefined> = signal(zip);
        this.weatherService.getLokationByZip(zipSig); //.getLocationFromService(zipSig);
        
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
              setTimeout(()=>{                
                this.addNewLocation(derivedZip);  
               },delay);             
            }
            else{
              //console.log('loadLocationsFromLocalStorage not handling '+ derivedZip+'' + ' locs = ' + locs + ' locs.length = '+ locs.length + ' ind = ' + ind);              
            }
        }
    }
  }

}
