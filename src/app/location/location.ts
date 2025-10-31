import { Component, inject, input, model } from '@angular/core';
import {Location} from '../location';
import { LocationImpl } from '../locationImpl';
import { Weather } from '../weather';
import { RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-location',
  imports: [RouterModule],
  templateUrl: './location.html',
  styleUrl: '../app.css',
})
export class Locationn {

  weatherService = inject(Weather);
  location  = input<Location>(new LocationImpl());
  locations = model(<Location []>(new Array<Location>));
  olocations = model(<Observable<Location[]>>  (new Observable<Location[]>));
  observables = model(<Observable<Location>[]> (new Array <Observable<Location>>)  );

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

          let newArr = new Array <Observable<Location>>;
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
