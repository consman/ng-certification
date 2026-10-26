import { Component, EventEmitter, inject, input, model, Output, signal, WritableSignal } from '@angular/core';

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

  @Output()
  onDelete = new EventEmitter<string>();

    constructor(){}


  handleClose(): void {
    const lokation = this.lokationSig();
    if (lokation) {
      this.weatherService.removeOneCallResponse(lokation);
    }
    else{
      console.warn('Location Component handleClose - Strange! the lokation is not available when trying to remove it! ')
    }
     this.onDelete.emit(lokation?.jeocode.zip);
  }

  spacesToDashes(locationNameWithSpaces: string): string {
    let result = '';
    result = locationNameWithSpaces.replace(' ', '-');
    return result;
  }
  
}
