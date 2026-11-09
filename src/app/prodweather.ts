import { Injectable, Service , Signal, WritableSignal, computed, effect, inject, signal} from '@angular/core';

import { Weather } from './weather';
import {HttpErrorResponse, HttpHeaders, httpResource, HttpResourceRequest} from '@angular/common/http';
import { Jeocode, Lokation, OneCallResponse } from './funTypes';

declare const W_APP_ID: string;

@Injectable({ providedIn: 'root' })
export class Prodweather extends Weather {

  wAppId = W_APP_ID;
  headers = new HttpHeaders();
  tempZip:String = '';

  constructor(){
    super();
  /*  
    effect(() => { //201
        const val = this.oneCallResource.value();
        if(val){
          //console.log('//eff 201 and  val.lat = '+ val.lat );
        }
      });
      */
    effect(() => {
      const notFound = this.isNotFound();
      const zip = this.zzipSig();
      if (zip && notFound){
        alert('The zip code, '+this.tempZip+', is formatted OK, but no data is returned.');
        this.inputJeoForOneCallSig.set(undefined);
      }
    });
  }

  override getFinalOneCallResponse(): () => OneCallResponse | undefined {
    //console.log('408 getFinalOneCallResponse PROD - this.oneCallForSearchResp()?.lat = '+ this.oneCallForSearchResp()?.lat );
    return this.oneCallResource.value;
  }
  
    readonly jeoCodeProdResource = httpResource<Jeocode | undefined> (() => {
        const zip = this.zzipSig();
        if (!zip ){ 
          //console.log('Prodweather - jeoCodeProdResource -  zip is not defined - returning undefined..'); 
          return undefined; 
        }
        else{
            //console.log('Inside the else stmt of jeoCodeProdResource and trying for zip = ' + zip);
            return {                
                url:'https://api.openweathermap.org/geo/1.0/zip?zip='+zip+',us&units=imperial&appid=' + this.wAppId,
                method:'GET'
            };
        }
    }); 

    override getJeoCodeByUnKnownZipSig():void{ 
      const zip = this.zzipSig();
      if(zip && zip.length == 5){
        //console.log('\nProdweather - getJeoCodeByUnKnownZipSig and the incoming zip = ' + zip);  
        this.tempZip = zip;      
      }
      //else {console.log('\nProdweather - getJeoCodeByUnKnownZipSig and the incoming zip is not ready :( ');  }
      this.setInputJeoForOneCallSig( this.jeoCodeProdResource.value);

    }  
  
      readonly oneCallResource = httpResource<OneCallResponse | undefined>( ()=> {
        const inputJeoForOneCall = this.jeoCodeProdResource.value(); //this.inputJeoForOneCallSig();
        if(!inputJeoForOneCall || !inputJeoForOneCall.lat || !inputJeoForOneCall.lon){
          //console.log('inside oneCallResource but inputJeoForOneCall is undefined or not started yet inputJeoForOneCall = '+ inputJeoForOneCall);
          return undefined;
        } else {
            //console.log('Inside the else part of oneCallResponseResource and trying for inputJeoForOneCall.name = ' + inputJeoForOneCall.name + ' and the lat is: '+inputJeoForOneCall.lat);
            return {
              url:'https://api.openweathermap.org/data/4.0/onecall/timeline/1day?lat='+inputJeoForOneCall.lat+'&lon='+inputJeoForOneCall.lon+'&units=imperial&exclude=minutely,hourly,alerts&appid='+this.wAppId,
              method: 'GET',
            };
        }
    });

    override getOneCallResponseByJeo() { //(jeoSig: WritableSignal<Jeocode | undefined>)
      let result:WritableSignal<OneCallResponse | undefined> = signal(undefined);
      const inputJeoForOneCall = this.inputJeoForOneCallSig();
      if(inputJeoForOneCall){
        //console.log('\nProdweather - getOneCallResponseByJeo and the incoming inputJeoForOneCall.zip = ' + inputJeoForOneCall.zip);
        result =  this.oneCallResource.value;
      } 
      this.oneCallForSearchResp = result;            
    }

  isNotFound = computed(() => { 
    const errr = this.jeoCodeProdResource.error(); //this.oneCallResource.error();
    //const targJeo = this.targJeoForOneCallSig();
    //const startedJeo = this.startedForGeoSig();
    let result = errr instanceof HttpErrorResponse && errr.status == 404;
    if(result){// && startedJeo){// && targJeo && targJeo.zip.length == 5 ) {
      console.log('inside computed logic for isNotFound ');// .... and targJeo. = ' + JSON.stringify(targJeo));
    }    
    return result;
  });
  }
