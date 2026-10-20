import { afterNextRender, Component, computed, effect, ElementRef, inject, Signal, signal, viewChild, WritableSignal } from '@angular/core';

import { Location } from '../location/location';
import { FormsModule } from '@angular/forms';
import { Weather } from '../weather';
import { BobsCompositeOcr } from '../funTypes';

@Component({
  imports: [FormsModule,Location],//, AsyncPipe],
  selector: 'app-search',
  styleUrl: './search.css',
  templateUrl: './search.html',
})
export class Search {

    weatherService = inject(Weather);
    newZip!: string;
    //bobsCompositeOcrSig:Signal<BobsCompositeOcr | undefined> = signal(undefined); 

    startedSig: WritableSignal<boolean> = signal( false); // this is at the request level
    atLeastOneReqStarted = false;                         // this is at the componenet level
    startedLoStZipSig: WritableSignal<String | undefined> = signal( undefined);

    junk: string = 'foo';
    inprogZipSig: WritableSignal<string | undefined> = signal(undefined);
    funcSig: WritableSignal<string> = signal('search');
    myInput = viewChild<ElementRef<HTMLInputElement>>('zipCodeEntry');
    startCheckExistinginListSig:WritableSignal<boolean> = signal( false);
    //localBceocrsSig: WritableSignal<WritableSignal<BobsCompositeOcr | undefined>[]> =signal(new Array<WritableSignal<BobsCompositeOcr>>);
    listSize: WritableSignal<number> = signal(0);

    
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

  public newListSize = computed(() => {
    return this.weatherService.bobsCompositeOcrsSig().length > 0 ? this.weatherService.bobsCompositeOcrsSig().length : 0;
  });

  firstZip = computed(() => {
    return this.weatherService.bobsCompositeOcrsSig().length > 0 ? this.weatherService.bobsCompositeOcrsSig()[0]()?.jeocode.zip : 99999;
  });

  secondZip = computed(() => {
    return this.weatherService.bobsCompositeOcrsSig().length > 1 ? this.weatherService.bobsCompositeOcrsSig()[1]()?.jeocode.zip : 99999;
  });

  search(): void{ 
    this.funcSig.set('search');
    this.startCheckExistinginListSig.set(true);    
    this.addNewLocation(this.newZip);
  }

  addNewLocation(zip: string): void {
    this.startedSig.set(true);
    console.log('addNewLocation going for addNewLocation for zip: ' + zip+ ' ...');

      if (this.validateZip(zip) ) {
        this.inprogZipSig.set(zip);
        let zipSig: WritableSignal<String | undefined> = signal(zip);
        this.weatherService.getOneCallResponseByZip(zipSig); //.getLocationFromService(zipSig);
        
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


    findIndexByZip(bcors: WritableSignal<BobsCompositeOcr | undefined>[],zip:String): number{
    //console.log(' findIndexByZip checking to see if '+zip+' is already in the array...');
    let result = -1;
    let ind = 0;
    bcors.forEach(bcor => { 

      if( zip == bcor()?.jeocode.zip){
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
            
            const bcos = this.weatherService.bobsCompositeOcrsSig();
            delay = delay +250;       
            let ind = this.findIndexByZip(bcos, derivedZip+'');
            if(bcos && derivedZip && ind === -1){
              console.log('loadLocationsFromLocalStorage Going for addNewLocation for '+derivedZip); 
              setTimeout(()=>{
                this.startedLoStZipSig.set(derivedZip);
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
