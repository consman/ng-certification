import { Component, EventEmitter, inject, input, model, Output, signal, WritableSignal } from '@angular/core';

import { Weather } from '../weather';
import { RouterModule } from '@angular/router';
import { Lokation, SearchResponse } from '../funTypes';
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
  //srSigsFromServer:WritableSignal<WritableSignal<SearchResponse | undefined> [] | undefined> = signal(undefined);

  @Output()
  onDelete = new EventEmitter<string>();  
  @Output()
  onHeadedtoFiveDay = new EventEmitter<string>();

    constructor(){
     
    }


  handleClose(): void { 
    const lokation = this.lokationSig();
    if (lokation) {
      //this.weatherService.removeOneCallResponse(lokation);
    }
    else{
      console.warn('Location Component handleClose - Strange! the lokation is not available when trying to remove it! ')
    }
     this.onDelete.emit(lokation?.jeocode.zip);
  }

  handleHeadedtoFiveDay():void{
    console.log('location component handleHeadedtoFiveDay running..');
    this.onHeadedtoFiveDay.emit('junk');    
  }

  spacesToDashes(locationNameWithSpaces: string): string {
    let result = '';
    result = locationNameWithSpaces.replace(' ', '-');
    return result;
  }
  
}
