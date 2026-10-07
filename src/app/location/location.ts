import { Component, inject, input, model, signal, WritableSignal } from '@angular/core';
import {LocationT} from '../location';
import { LocationImpl } from '../locationImpl';
import { Weather } from '../weather';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'app-location',
  styleUrl: '../app.css',
  templateUrl: './location.html',
})
export class Location {

  weatherService = inject(Weather);//TODO it does not look lie we need this
  location  = input<LocationT | undefined>(new LocationImpl());

  //locationsModel = model(<WritableSignal               <LocationT | undefined> []>                 (new Array<WritableSignal<LocationT>>));
    locationsModel = model(<WritableSignal<WritableSignal<LocationT | undefined> []>> (signal(new Array<WritableSignal<LocationT>>)));
  
    constructor(){
  }


  handleClose(): void {
    //const locations = this.locationsModel();
    const loc = this.location();
    
    if(this.locationsModel && loc && loc.zip != undefined){

      const index = this.findIndexByZip(this.locationsModel()(), loc.zip);
      //console.log('handleClose says to index to be spliced = ' + index);
      
      setTimeout(()=>{
        
          this.locationsModel()().splice(index, 1);
          if (null != this.getZipLocalStorageKey(loc.zip)){
            localStorage.removeItem('storedZipCode'+loc.zip);
            //console.log(' Handleclose() removed storedZipCode'+ loc.zip);
            //console.log('A this.locations().length now = ' + this.locationsModel.length);
            //this.olocations.set( of(this.locations()));

            let newArr: WritableSignal<LocationT | undefined>[] =[]; 
            this.locationsModel()().forEach(loc => {
              newArr.push(loc);
            });
            
             this.locationsModel().set( newArr );
            //this.observables.set(newArr);          
          } 
      },100);
    }
  }

  findIndexByZip(locs: WritableSignal<LocationT | undefined>[],zip:String): number{
    let result = -1;
    let ind = 0;
    locs.forEach(loc => { 
      if( zip == loc()?.zip){
        result = ind;
      }
      ind++;

    });
    return result;
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
