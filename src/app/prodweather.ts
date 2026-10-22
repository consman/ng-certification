import { Injectable, Service , WritableSignal, computed, effect, inject, signal} from '@angular/core';


import { Weather } from './weather';
import {HttpHeaders, httpResource, HttpResourceRequest} from '@angular/common/http';
import { Jeocode } from './funTypes';

declare const W_APP_ID: string;

@Injectable({ providedIn: 'root' })
export class Prodweather extends Weather {
  override getOneCallResponseByJeoCode(joeCode: Jeocode): void {
    throw new Error('Method not implemented.');
  }
  override getGeoCodeInfoFromZipWoKnownGeoCodes(zipcode: WritableSignal<String | undefined>): WritableSignal<Jeocode | undefined> {
    throw new Error('Method not implemented.');
  }
  

}
