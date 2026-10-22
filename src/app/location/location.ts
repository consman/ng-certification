import { Component, inject, input, model, signal, WritableSignal } from '@angular/core';

import { Weather } from '../weather';
import { RouterModule } from '@angular/router';
import { Lokation } from '../funTypes';
import { initialLokation } from '../refData';

@Component({
  imports: [RouterModule],
  selector: 'app-location',
  styleUrl: '../app.css',
  templateUrl: './location.html',
})
export class Location {

  weatherService = inject(Weather);//TODO it does not look lie we need this

   lokationSig = input<Lokation | undefined>(initialLokation); 

    constructor(){}


  handleClose(): void {
    //TODO use the service and don't forget to remove from local storage!
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
  
}
