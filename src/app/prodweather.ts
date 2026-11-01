import { Injectable, Service , Signal, WritableSignal, computed, effect, inject, signal} from '@angular/core';


import { Weather } from './weather';
import {HttpHeaders, httpResource, HttpResourceRequest} from '@angular/common/http';
import { Jeocode, Lokation, OneCallResponse } from './funTypes';

declare const W_APP_ID: string;

@Injectable({ providedIn: 'root' })
export class Prodweather extends Weather {

  wAppId = W_APP_ID;
  headers = new HttpHeaders();
  startedOneCallSig: WritableSignal<boolean> = signal( false);
  startedForGeoSig: WritableSignal<boolean> = signal( false);

  dummyForGeoCodeSig:WritableSignal<String | undefined>= signal(new Date().getTime()+'');
  dummyForOneCallSig:WritableSignal<String | undefined>= signal(new Date().getTime()+'');


    private zzipSig:WritableSignal<String | undefined>= signal(undefined);
    jeoCodeProdResource = httpResource<Jeocode | undefined> (() => {
        const zip = this.zzipSig();
        if (!zip ){ console.log('Prodweather - jeoCodeProdResource -  zip is not defined - returning undefined..'); return undefined; }
        else{
            return {                
                url:'https://api.openweathermap.org/geo/1.0/zip?zip='+zip+',us&units=imperial&appid=' + this.wAppId,
                method:'GET'
            };
        }
    }); 

    override getJeoCodeByUnKnownZipSig(zip: string): WritableSignal<Jeocode | undefined> { 
        console.log('\nProdweather - getJeoCodeByUnKnownZipSig and the incoming zip = ' + zip);
        //this.jeoResult = this.jeoCodeProdResource.value;
        this.zzipSig.set(zip);
        return this.jeoCodeProdResource.value;
    }  
  

}
