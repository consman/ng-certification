import { afterNextRender, Component, effect, inject, signal, WritableSignal } from '@angular/core';

import { Location } from '../location/location';
import { FormsModule } from '@angular/forms';
import { Weather } from '../weather';
import {LocationT} from '../location';

@Component({
  imports: [Location,FormsModule],//, AsyncPipe],
  selector: 'app-search',
  styleUrl: './search.css',
  templateUrl: './search.html',
})
export class Search {

    weatherService = inject(Weather);
    newZip!: string;
    location!: LocationT;
    //locationSigs: WritableSignal<WritableSignal<LocationT | undefined>[]> = signal([]); //writeable signal of array of writeable signals
    locationSigs: WritableSignal<WritableSignal<LocationT | undefined>[]> = signal(new Array<WritableSignal<LocationT>>); //writeable signal of array of writeable signals

    //. new Array<WritableSignal<LocationT>>
    locResponseSig:WritableSignal<LocationT | undefined> =signal(undefined); 

    startedSig: WritableSignal<boolean> = signal( false);
    //forceEffect: WritableSignal<string> = signal( '');

    junk: string = 'foo';
    inprogZipSig: WritableSignal<string> = signal('');
    //alreadyReceivedResponseForZipSig: WritableSignal<string> = signal('');
    funcSig: WritableSignal<string> = signal('search');

  constructor(){
    
    afterNextRender( ()=> {
      //this.loadLocationsFromLocalStorage();
    });
/*
    effect(() => { // 002
      const loc = this.locResponseSig();
      const started = this.startedSig();
      const inprogZip = this.inprogZipSig();
      if (started && (inprogZip == '' || inprogZip == loc?.zip)) {
        console.log(' effect 002 running and loc?.zip = ' + loc?.zip);
      }
    });
    */
 
    effect(() => { // 001 use only for search 
      const func = this.funcSig();
      const loc = this.locResponseSig();
      const started = this.startedSig();
      const inprogZip = this.inprogZipSig();
      //console.log(' trying effect 001 and func = '+func+' and started = ' + started+  ' and inprogZip = '+inprogZip + ' this.newZip = ' + this.newZip ); //+ ' alreadyReceivedResponseForZip = '+ alreadyReceivedResponseForZip
      if (func == 'search' && started && loc && inprogZip != '' && (inprogZip == loc?.zip)) { // inprogZip == loc?.zip) ) { //&& alreadyReceivedResponseForZip != loc?.zip                
        console.log(' in effect 001 in IF Statement and loc.sys.id= '+ loc.sys.id  + ' and loc.weather[0].main = ' + loc.weather[0].main);
        loc.weather[0].main = this.getIconFrom(loc.weather[0].main);
        loc.zip = this.newZip;
        this.location = loc;
        this.location.zip = loc.zip;
        let temp:WritableSignal<LocationT | undefined> = signal(this.locResponseSig());
        this.addToLocationsArray(temp); 
        if(this.newZip) {
          localStorage.setItem('storedZipCode' + (this.newZip), this.newZip)
        };
        this.newZip = '';          
      }
      else {
        if(func != 'search') {
          console.log('eff 001 - Not in search mode. func = '+ func);
        }
        else if(!started) {
          console.log('eff 001 - Not started yet. started = '+started);
        }
        else if(!loc){
          console.log( 'loc is still missing - effect fired because of one of the other signals it is a zip with no location like 98888 ') ;
          alert('The zip code, ' + inprogZip + ', is formatted OK, but no data is returned.'); 
        }
        else if(inprogZip == '' ){
            console.log(' eff 001 inprogZip is still \'\' ');
        }           
        else if( inprogZip != loc?.zip){
          console.log(' eff 001  the inprogress zip '+ inprogZip + ' is different from the zip of the incoming loc: '+loc?.zip +' .');
        }   
        else if(!loc.zip){
          console.warn( ' loc is here but does not have a zip . loc.zip = ' + loc.zip + ' the loc.name = '+ loc.name) ;
        }  
        else{
          console.log('not sure whats going on...started = '+started+  ' func= '+func +' inprogZip = ' + inprogZip + ' and loc?.zip = ' + loc?.zip + ' and loc?.name = ' + loc?.name);
        }
      } 
    });
    
  }

  findIndexByZip(locs: WritableSignal<LocationT | undefined>[],zip:String): number{
    //console.log(' findIndexByZip checking to see if '+zip+' is already in the array...');
    let result = -1;
    let ind = 0;
    locs.forEach(loc => { 

      if( zip == loc()?.zip){
        result = ind;
      }
      ind++;

    });
    console.log(' -- findIndexByZip index = ' + result);
    return result;
  }
  
  search(): void{ 
    
    const locs =this.locationSigs();
    let len = 0 ;
    if (locs && this.findIndexByZip(locs,this.newZip) === -1) { 
      //
      this.addNewLocation(this.newZip);
      
    }else {
      alert ('The zip code of ' + this.newZip + ' is already in the list. ');
    }
    
    //console.log('Done with search(). The number of this.locations is: '+ (locs != undefined ? locs.length : 0));

  }

  addNewLocation(zip: string): void {
    this.startedSig.set(true);
    //
    console.log('addNewLocation going for addNewLocation for zip: ' + zip+ ' ...');

      if (this.validateZip(zip) ) {
        this.inprogZipSig.set(zip);
        let zipSig: WritableSignal<String | undefined> = signal(zip);
        this.locResponseSig = this.weatherService.getLocationFromService(zipSig);
        //this.forceEffect.set(new Date().getTime()+'|'+zipSig());
      }
      else {
        console.error('ERROR! ' + zip + ' zip is not valid');
        alert('Unable to find any weather data for ' + zip + '. Please try a different zip code. ');
        //return null;
      }

  }

  validateZip(unVaidatedZip: string): boolean {
    let result = false;
    result = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(unVaidatedZip);
    return result;
  }

  getIconFrom(input: string): string{
    if ( input === 'Clouds'){
      return 'clouds';
    }
    if ( input === 'Sunny'){
      return 'sun';
    }
    if ( input === 'Rain'){
      return 'rain';
    }
    if ( input === 'Snow'){
      return 'snow';
    }
    if ( input === 'clouds' || input === 'sun' || input === 'rain' || input === 'snow' ){
      return input; // Disabling cache does not always work
    }
    return 'sun';
  }

  loadLocationsFromLocalStorage(): void {

    this.funcSig.set('localStorage');

    let delay = 2000;
    
    for (const localStorageKey in localStorage) {
          
        if (localStorageKey.startsWith('storedZipCode')){  
            const derivedZip =  localStorage.getItem(localStorageKey); 
            
            const locs = this.locationSigs();
            delay = delay +2000;       
            if(locs && derivedZip && this.findIndexByZip(locs, derivedZip) === -1){
              console.log('loadLocationsFromLocalStorage Going for addNewLocation for '+derivedZip); 
              setTimeout(()=>{
                this.addNewLocation(derivedZip);  
               },delay);             
            }
        }
    }
    setTimeout(()=>{
      //this.handleUnprocessedLocalStorage();
    },2000);

  }

  handleUnprocessedLocalStorage():void {
    console.log('handling unprocessed....');
    //for each of the working storage zips not already in the locations array, add them in, maybe one at a time with another timer.
  }


  addToLocationsArray(locationSig: WritableSignal<LocationT    | undefined> ) : void{
    this.inprogZipSig.set('');
    // check for dups first -- although this may havbe already been done..
    console.log('addToLocationsArray running and try to add ' + locationSig()!.zip);
    const locs = this.locationSigs();
    //console.log('Checking zip of first location in array..' +(this.locationSigs.length > 0 ? locs[0]()?.zip :''));
    if (locs && this.findIndexByZip(locs, locationSig()!.zip)  === -1) {
      //locs.push(location);//TODO probly not right and need to use signal update like in Al's book
      //console.log(' Looks good. Trying to push...');
      
      locs.push(locationSig);
      this.junk = 'roo'+locationSig()!.zip;
      
      //this.alreadyReceivedResponseForZipSig.set(locationSig()!.zip);
    }
    else{
      console.log('Not pushing because '+ locationSig()!.zip +' is already found. ');
    }
  }

}
