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

  weatherService = inject(Weather);

   lokationSig = input<Lokation | undefined>(initialLokation); 

    constructor(){}


  handleClose(): void {
    const lokation = this.lokationSig();
    if (lokation) {
      this.weatherService.removeOneCallResponse(lokation);
    }
    else{
      console.warn('Location Component handleClose - Strange! the lokation is not available when rying to remove it! ')
    }
  }

  spacesToDashes(locationNameWithSpaces: string): string {
    let result = '';
    result = locationNameWithSpaces.replace(' ', '-');
    return result;
  }
  
}
