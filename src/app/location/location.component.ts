import { Component, inject, input, model } from '@angular/core';
import {Location} from '../location';
import { LocationImpl } from '../locationImpl';
import { WeatherService } from '../weather.service';
import { RouterModule } from '@angular/router';
import { Observable, forkJoin, of, pipe, tap } from 'rxjs';
//import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-location',
  imports: [RouterModule],
  templateUrl: './location.component.html',
  styleUrl: '../app.component.css'
})
export class LocationComponent {
  weatherService = inject(WeatherService);
  location  = input<Location>(new LocationImpl());
  locations = model(<Location []>(new Array<Location>));
  olocations = model(<Observable<Location[]>>  (new Observable<Location[]>));
  observables = model(<Observable<Location>[]> (new Array <Observable<Location>>)  );

  constructor(){
  }

  handleClose(): void {
    const index = this.locations().findIndex( d => d.zip === this.location().zip );
    console.log(' index = ' + index);
    setTimeout(()=>{
        this.locations().splice(index, 1);
        if (null != this.getZipLocalStorageKey(this.location().zip)){
          localStorage.removeItem('storedZipCode'+this.location().zip);
          console.log(' Handleclose() removed storedZipCode'+ this.location().zip);
          console.log('A this.locations().length now = ' + this.locations().length);
          this.olocations.set( of(this.locations()));

          let newArr = new Array <Observable<Location>>;
          this.locations().forEach(loc => {
            newArr.push(of(loc));
          });
          this.observables.set(newArr);          
        } 
    },100);
  console.log('B this.locations().length now = ' + this.locations().length);
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
