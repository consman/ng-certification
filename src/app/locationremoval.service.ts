import { Injectable } from '@angular/core';
import {Location} from './location';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationremovalService {

  constructor() { }

  private removedLocations!: Location[];

  private obsMap: Map<string,number> = new Map<string,number>; 

  private newObservablesArray!: Observable<Location>[];

  printMap(): string {
    let result = '';
    this.obsMap.forEach((k,v) =>{
      result = result + ('|   '+k+ ' : '+ v);
    });
    return result;
  }

  addToObsMap(zip:string ,ind:number): void {
    this.obsMap.set( zip, ind);
    console.log( 'LocationremovalService - zip:' + zip + '  ' + ind + ' added to map and now the map is: '+this.printMap());
  }

  getNewObservablesArray(): Observable<Location>[] {
      return this.newObservablesArray;
  }

  addToRemovedLocations(incomingLoc: Location, observablesArray: Observable<Location>[]):void{
    if (this.removedLocations == null){
      this.removedLocations = [];
    }
    this.removedLocations.push(incomingLoc);
    this.newObservablesArray= observablesArray;
    //this.obsMap.set(incomingLoc.zip,indexOfObservablesArray);    
    //console.log('LocationremovalService add is now complete.. for ' + incomingLoc.zip +' : '+ indexOfObservablesArray);
  }

  getRemovedLocations(): Location [] {
    return this.removedLocations;
  }

  removeObsIndex(zip:string){
    this.obsMap.delete(zip);
  }

  getObsIndex(zip:string):number{
    let result = 0;
    let position = this.obsMap.get(zip);
    if ( position !== undefined){
      result = position;
    }
    else{
      result = -1;
      console.warn('Cannot find position in ObsMap for zip:' + zip);
    }
    return result
  }

  checkRemovedLocation(zip: string): boolean{
    console.log('checkRemovedLocation checking for '+ zip);
    let result = false;
    if (this.removedLocations != null && this.removedLocations.length > 0){
      this.removedLocations.forEach(loc => {
        if (loc.zip ==zip){
          result =  true;
        }
      });
    }
    console.log('checkRemovedLocation resultfor zip '+ zip+': ' + result);
    return result;
  }

  getRemovedLocationByZip(zip: string): Location{
    let result!: Location;
    if (this.removedLocations != null && this.removedLocations.length > 0){
      this.removedLocations.forEach(loc => {
        if (loc.zip){
          result =  loc;
        }
      });
    }
    return result;
  }

  unRemoveRemovedLocation(zip: string):void{
    if (this.removedLocations != null && this.removedLocations.length > 0){
      const index = this.removedLocations.findIndex( d => d.zip === zip );
      if ( index !== -1){
        this.removedLocations.splice(index,1);
      }
    }
  }
  
}
