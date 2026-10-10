import { afterNextRender, Component, effect, ElementRef, inject, signal, viewChild, WritableSignal } from '@angular/core';

import { Location } from '../location/location';
import { FormsModule } from '@angular/forms';
import { Weather } from '../weather';
//import {LocationT} from '../location';
import { OneCallResponse,BobsCompositeOcr } from '../funTypes';

@Component({
  imports: [FormsModule,Location],//, AsyncPipe],
  selector: 'app-search',
  styleUrl: './search.css',
  templateUrl: './search.html',
})
export class Search {

    weatherService = inject(Weather);
    newZip!: string;
    bobsCompositeOcrSig:WritableSignal<BobsCompositeOcr | undefined> = signal(undefined); 

    startedSig: WritableSignal<boolean> = signal( false);

    junk: string = 'foo';
    inprogZipSig: WritableSignal<string> = signal('');
    funcSig: WritableSignal<string> = signal('search');
    myInput = viewChild<ElementRef<HTMLInputElement>>('zipCodeEntry');
    localBcocrS: WritableSignal<WritableSignal<BobsCompositeOcr | undefined>[]>;

  constructor(){
    //afterNextRender( ()=> {
      this.loadLocationsFromLocalStorage();
    //});

    this.localBcocrS = this.weatherService.bobsCompositeOcrsSig;

    effect(() => { //003
      const localBcocr = this.localBcocrS();
      console.log('003 The number of entries in the localBcocr array is: '+localBcocr.length);
    });


    effect(() => { // 002 use only for localStorage
      const func = this.funcSig();
      const bcocr = this.bobsCompositeOcrSig();
      const started = this.startedSig();
      const inprogZip = this.inprogZipSig();
      let validBcocr = (bcocr && bcocr.oneCallResponse && bcocr.oneCallResponse.data && bcocr.oneCallResponse.data.length > 0)
      if (func == 'localStorage' && started && bcocr && validBcocr && inprogZip != '') { //  && (inprogZip == loc?.zip)) { // inprogZip == loc?.zip) ) { //&& alreadyReceivedResponseForZip != loc?.zip                
        //console.log(' in effect 002 in IF Statement and loc.sys.id= '+ loc.sys.id  + ' and loc.name = ' + loc.name + ' and the number o locations is: '+ locations.length);
        bcocr.oneCallResponse.data[0].weather[0].main = this.getIconFrom(bcocr.oneCallResponse.data[0].weather[0].main);
        
        this.newZip = '';
        const inputElement = this.myInput()?.nativeElement;
        if (inputElement) {
          inputElement.focus();
          inputElement.value = ' ';
          inputElement.dispatchEvent(new Event('input', { bubbles: true }));
          inputElement.value = '';
          inputElement.dispatchEvent(new Event('input', { bubbles: true }));
          inputElement.focus();
        }          
      }
      else {
        if(func != 'localStorage') {
          //console.log('eff 002 - Not in localStorage mode. func = '+ func);
        }
        else if(!started) {
          //console.log('eff 002 - Not started yet. started = '+started);
        }
        else if(!bcocr){
          console.log( 'eff 002 --loc is still missing - effect fired because of one of the other signals it is a zip with no location like 98888 ') ;
          //alert('The zip code, ' + inprogZip + ', is formatted OK, but no data is returned.'); 
        }
        else if(inprogZip == '' ){
            //console.log(' eff 002 inprogZip is still \'\' ');
        }           
        else if( inprogZip != this.newZip){
          //console.log(' eff 002 the inprogress zip '+ inprogZip + ' is different from the zip of the incoming loc: '+loc?.zip +' .');
        }   
        else if(bcocr && (!bcocr.jeocode|| !bcocr.jeocode.zip)){
          console.warn( 'eff 002  bcocr is here but does not have a zip or a containing geocode') ;
        }  
        else{
          //console.log('eff 002  not sure whats going on...started = '+started+  ' func= '+func +' inprogZip = ' + inprogZip + ' and loc?.zip = ' + loc?.zip + ' and loc?.name = ' + loc?.name);
        }
      } 
    });

    effect(() => { // 001 use only for searh function
      const func = this.funcSig();
      const bcocr = this.bobsCompositeOcrSig();
      const started = this.startedSig();
      const inprogZip = this.inprogZipSig();
      let validBcocr = (bcocr && bcocr.oneCallResponse && bcocr.oneCallResponse.data && bcocr.oneCallResponse.data.length > 0)
      if (func == 'search' && started && bcocr && validBcocr && inprogZip != '') { //  && (inprogZip == loc?.zip)) { // inprogZip == loc?.zip) ) { //&& alreadyReceivedResponseForZip != loc?.zip                
        //console.log(' in effect 001 in IF Statement and loc.sys.id= '+ loc.sys.id  + ' and loc.name = ' + loc.name + ' and the number o locations is: '+ locations.length);
        bcocr.oneCallResponse.data[0].weather[0].main = this.getIconFrom(bcocr.oneCallResponse.data[0].weather[0].main);
        
        this.newZip = '';
        const inputElement = this.myInput()?.nativeElement;
        if (inputElement) {
          inputElement.focus();
          inputElement.value = ' ';
          inputElement.dispatchEvent(new Event('input', { bubbles: true }));
          inputElement.value = '';
          inputElement.dispatchEvent(new Event('input', { bubbles: true }));
          inputElement.focus();
        }          
      }
      else {
        if(func != 'search') {
          //console.log('eff 001 - Not in search mode. func = '+ func);
        }
        else if(!started) {
          //console.log('eff 001 - Not started yet. started = '+started);
        }
        else if(!bcocr){
          console.log( 'eff 001 --bcocr is still missing - effect fired because of one of the other signals it is a zip with no location like 98888 ') ;
          //alert('The zip code, ' + inprogZip + ', is formatted OK, but no data is returned.'); 
        }
        else if(inprogZip == '' ){
            //console.log(' eff 001 inprogZip is still \'\' ');
        }           
        else if( inprogZip != this.newZip){
          //console.log(' eff 001 the inprogress zip '+ inprogZip + ' is different from the zip of the incoming loc: '+loc?.zip +' .');
        }   
        else if(bcocr && (!bcocr.jeocode|| !bcocr.jeocode.zip)){
          console.warn( 'eff 001  bcocr is here but does not have a zip or a containing geocode') ;
        }  
        else{
          //console.log('eff 001  not sure whats going on...started = '+started+  ' func= '+func +' inprogZip = ' + inprogZip + ' and loc?.zip = ' + loc?.zip + ' and loc?.name = ' + loc?.name);
        }
      } 
    });
    
  }
  
  search(): void{ 
    this.funcSig.set('search');
    const bcocrs =this.weatherService.bobsCompositeOcrsSig()//.locationSigs();
    let len = 0 ;
    if (bcocrs && this.findIndexByZip(bcocrs,this.newZip) === -1) { 
      //
      this.addNewLocation(this.newZip);
      
    }else {
      alert ('The zip code of ' + this.newZip + ' is already in the list. ');
    }
    
    //console.log('Done with search(). The number of this.locations is: '+ (locs != undefined ? locs.length : 0));

  }

  addNewLocation(zip: string): void {
    this.startedSig.set(true);
    //console.log('addNewLocation going for addNewLocation for zip: ' + zip+ ' ...');

      if (this.validateZip(zip) ) {
        this.inprogZipSig.set(zip);
        let zipSig: WritableSignal<String | undefined> = signal(zip);

        this.bobsCompositeOcrSig = this.weatherService.getOneCallResponseByZip(zipSig); //.getLocationFromService(zipSig);
      }
      else {
        console.error('ERROR! ' + zip + ' zip is not valid');
        alert('Unable to find any weather data for ' + zip + '. Please try a different zip code. ');        
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

    findIndexByZip(bcors: WritableSignal<BobsCompositeOcr | undefined>[],zip:String): number{
    //console.log(' findIndexByZip checking to see if '+zip+' is already in the array...');
    let result = -1;
    let ind = 0;
    bcors.forEach(bcor => { 

      if( zip == bcor()?.jeocode.zip){
        result = ind;
      }
      ind++;

    });
    //console.log(' -- findIndexByZip index = ' + result);
    return result;
  }

  loadLocationsFromLocalStorage(): void {

    this.funcSig.set('localStorage');

    let delay = 250;
    
    for (const localStorageKey in localStorage) {
          
        if (localStorageKey.startsWith('storedZipCode')){  
            const derivedZip =  localStorage.getItem(localStorageKey); 
            
            const bcos = this.weatherService.bobsCompositeOcrsSig();
            delay = delay +250;       
            let ind = this.findIndexByZip(bcos, derivedZip+'');
            if(bcos && derivedZip && ind === -1){
              //console.log('loadLocationsFromLocalStorage Going for addNewLocation for '+derivedZip); 
              setTimeout(()=>{
                this.addNewLocation(derivedZip);  
               },delay);             
            }
            else{
              //console.log('loadLocationsFromLocalStorage not handling '+ derivedZip+'' + ' locs = ' + locs + ' locs.length = '+ locs.length + ' ind = ' + ind);              
            }
        }
    }
    
  }

  /*
  handleUnprocessedLocalStorage():void {
    //console.log('handling unprocessed....');
    //for each of the working storage zips not already in the locations array, add them in, maybe one at a time with another timer.
  }


  addToLocationsArray(locationSig: WritableSignal<LocationT    | undefined> ) : void{
    
    // check for dups first -- although this may havbe already been done..
    //console.log('addToLocationsArray running and try to add ' + locationSig()!.zip);
    const locs = this.locationSigs();
    const location = locationSig();

    //console.log('Checking zip of first location in array..' +(this.locationSigs.length > 0 ? locs[0]()?.zip :''));
    if (location && locs && this.findIndexByZip(locs, location.zip)  === -1) {
      //locs.push(location);//TODO probly not right and need to use signal update like in Al's book
      //console.log(' Looks good. Trying to push...');
      //console.log('this.locationSigs().length before: '+this.locationSigs().length);
      locs.push(locationSig);
      //console.log('this.locationSigs().length after: '+this.locationSigs().length);
      this.junk = 'roo'+location!.zip;
      
      
    }
    else{
      //console.log('Not pushing because '+ location!.zip +' is already found. ');
    }
    //this.inprogZipSig.set('');
  }
*/
}
