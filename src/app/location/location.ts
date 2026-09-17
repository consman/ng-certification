import { Component, inject, input, model } from '@angular/core';
import {LocationT} from '../location';
import { LocationImpl } from '../locationImpl';
import { Weather } from '../weather';
import { RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  imports: [RouterModule],
  selector: 'app-location',
  styleUrl: '../app.css',
  templateUrl: './location.html',
})
export class Location {

  weatherService = inject(Weather);
  location  = input<LocationT>(new LocationImpl());
  locations = model(<LocationT []>(new Array<LocationT>));
  olocations = model(<Observable<LocationT[]>>  (new Observable<LocationT[]>));
  observables = model(<Observable<LocationT>[]> (new Array <Observable<LocationT>>)  );

    constructor(){
  }
  handleClose(): void {
    const index = this.locations().findIndex( d => d.zip === this.location().zip );
    
    setTimeout(()=>{
        this.locations().splice(index, 1);
        if (null != this.getZipLocalStorageKey(this.location().zip)){
          localStorage.removeItem('storedZipCode'+this.location().zip);
          //console.log(' Handleclose() removed storedZipCode'+ this.location().zip);
          //console.log('A this.locations().length now = ' + this.locations().length);
          this.olocations.set( of(this.locations()));

          let newArr = new Array <Observable<LocationT>>;
          this.locations().forEach(loc => {
            newArr.push(of(loc));
          });
          this.observables.set(newArr);          
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
  
  logNumberInObservableArray():void{
    let result =0;
    this.olocations().subscribe({
      next: (data ) => {
        data.forEach(loc => {
          console.log('One loc is : ' + loc.zip);
          result = result + 1;
        });
        
      },
      error: () => {},
      complete: () => {}
    });
    
  }

}
