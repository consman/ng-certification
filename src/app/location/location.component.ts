import { Component, Input, inject } from '@angular/core';
import {Location} from '../location';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WeatherService } from '../weather.service';
import { LocationremovalService } from '../locationremoval.service';
import { Observable, Subscribable, Subscription, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, NgIf, RouterModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {
  weatherService = inject(WeatherService);
  @Input()
  location!: Location;

  @Input()
  locations!: Location[];

  @Input()
  locations$!: Observable<Location[]>;

  @Input()
  observables!: Observable<Location>[];

  @Input()
  myVal!: number;



  constructor(private locationremovalService: LocationremovalService){

  }

  setupobsmap(zip:string):void{
    //let result = 0;
    let targetZip = '';
    let found = false;
    let done = false;
    let safecheck = 0;
    let idx = 0;
    let subs!: Subscription;

    let x = this.observables != undefined && this.observables.length ? this.observables.length : 0;
    //console.log('starting with '+x+ ' for zip='+ zip +' and observables of length: ' + (this.observables !== undefined && this.observables.length ) ? this.observables.length : 0);

    let subArr = [];
    while (!done && this.observables){
      
      found = false;
      if(this.observables[x]){    

        subArr.push( this.observables[x].subscribe({
          next: (loc ) => {
            targetZip = loc.zip;
            if ( loc.zip === zip){
              found = true;
              done = true;
            }
            else{
              found = false;
            }
          },
          error: () => {},
          complete: () => {
            if (found){
              console.log('Found and the IndexOfObservableInObservablesArray is ' + x + ' and targetZip is: ' + targetZip);
              this.locationremovalService.addToObsMap(targetZip,x);
            }
            else{
              console.log('not found for result='+ x+ ' zip='+targetZip);
            }
          }
        }));          
      }
      //subs.unsubscribe();
      x--;
      safecheck++;
      if(safecheck > this.observables.length || safecheck > 20){
        done = true;
      }  
    }
    subArr.forEach(s=>{
      s.unsubscribe();
    });
  }

  removeFromObservablesX():void{
    //console.log('The number of the observables BEFORE removal is : '+ 
     //(this.observables !== undefined && this.observables.length && this.observables.length> 0) ? this.observables.length:0);
    
    if (this.observables && this.observables.length >0 ){
      console.log('The number of the observables BEFORE removal is : '+this.observables.length);
     
    let newObsArray: Observable<Location>[] =[]; 
    let tempObsLoc: Observable<Location>;

    this.observables.forEach(obs =>{
            
      let subscr= obs.subscribe({
        next: (loca ) => {
          
          if ( loca.zip === this.location.zip){
            console.log ('dup found: ' + loca.zip + '  ' + this.location.zip);
          }
          else{
            console.log ('not a dup: ' + loca.zip + '  ' + this.location.zip);
            newObsArray.push(obs);
          }
        },
        error: () => {},
        complete: () => {
          console.log('subscription complete and newObsArray.length = ' + newObsArray.length);
        }
      });
      setTimeout(()=>{
        subscr.unsubscribe();
        //console.log('timeout done..');
      },
      300);

    });
    setTimeout(()=>{
      this.observables = newObsArray;
      console.log('The number of the observables AFTER removal is : '+ this.observables.length);

    }, 300);
  }
    else{
      console.log('The number of the observables BEFORE removal is : 0');
    }
 
    //this.locations$ = forkJoin(this.observables);
  }

  handleClose(): void {
    // TODO we need to have the list of locations from the search results so that we can remove
    // the closed location from it here as well as remove it from local storage.
        
        this.myVal = 9; 
        console.log('LocationComponent - Locations BEFORE removal: '+ this.printLocs())
        const index = this.locations.findIndex( d => d.zip === this.location.zip );
        this.locations.splice(index, 1);
        if (null != this.getZipLocalStorageKey(this.location.zip)){
          localStorage.removeItem(this.getZipLocalStorageKey(this.location.zip));
        }
        this.locationremovalService.addToRemovedLocations(this.location,this.observables);
        //this.getIndexOfObservableInObservablesArray(this.location.zip);
        //this.locationremovalService.addToRemovedLocations(this.location);
        //this.locations$ = of(this.locations);
        //this.removeFromObservables();
        //console.log('LocationComponent - Locations AFTER removal: '+ this.printLocs())   
        this.setupobsmap(this.location.zip);     
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

  printLocs(): string{
    let result ='';
    this.locations.forEach(loc =>{
      result = result + loc.zip + ' ';
    });
    return result;
   }  


}
