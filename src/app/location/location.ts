import { Component, inject, input, model, signal, WritableSignal } from '@angular/core';
import {LocationT} from '../location';
import { LocationImpl } from '../locationImpl';
import { Weather } from '../weather';
import { RouterModule } from '@angular/router';
import { BobsCompositeOcr } from '../funTypes';
import { initialBobsCompositeOcr } from '../refData';

@Component({
  imports: [RouterModule],
  selector: 'app-location',
  styleUrl: '../app.css',
  templateUrl: './location.html',
})
export class Location {

  weatherService = inject(Weather);//TODO it does not look lie we need this
  //location  = input<LocationT | undefined>(new LocationImpl());
  bobsCompositeOcr = input<BobsCompositeOcr | undefined>(initialBobsCompositeOcr); 

  //locationsModel = model(<WritableSignal<WritableSignal<LocationT | undefined> []>> (signal(new Array<WritableSignal<LocationT>>)));
  //bobsCompositeOcrsModel = model(<WritableSignal<WritableSignal<BobsCompositeOcr | undefined> []>> (signal(new Array<WritableSignal<BobsCompositeOcr>>)));
    constructor(){
  }


  handleClose(): void {
    //const locations = this.locationsModel();
    const bcocr = this.bobsCompositeOcr();
    //const bobsCompositeOcrs = this.weatherService.bobsCompositeOcrsSig();
    let zip ='';
    
    if(bcocr && bcocr.jeocode && bcocr.jeocode.zip){
      zip = bcocr.jeocode.zip
    }
      
    setTimeout(()=>{
      
      this.weatherService.removeOneCallResponse(signal(bcocr)); 
      this.weatherService.echoArraySize();

      if (null != this.getZipLocalStorageKey(zip)){
        localStorage.removeItem('storedZipCode'+zip);
      } 
    },100);
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

  spacesToDashes(locationNameWithSpaces: string): string {
    let result = '';
    result = locationNameWithSpaces.replace(' ', '-');
    return result;
  }
  
  //Currently commented out in template:
  /*
  logNumberInObservableArray():void{
    let result =0;
    this.olocations().subscribe({
      next: (data ) => {
        data.forEach(loc => {
          //console.log('One loc is : ' + loc.zip);
          result = result + 1;
        });
        
      },
      error: () => {},
      complete: () => {}
    });
    
  }
*/
}
