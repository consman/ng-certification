import { TestBed } from '@angular/core/testing';
import { Weather } from './weather';

import { environment } from '../environments/environment';
import { weatherServiceFactory } from './weatherservice.factory';
import {HttpClient} from '@angular/common/http';
//import {RAWFORECASTS, RAWLOCATIONS} from './mock-data'; 
import { of } from 'rxjs';
import { KNOWNGEOCODES } from './refData';
import { signal } from '@angular/core';

/*
export const FAKE_HTTP_CLIENT_LOCATIONS = {
  get: (url: string |null) => of(RAWLOCATIONS)
} as HttpClient;

export const FAKE_HTTP_CLIENT_FORECASTS = {
  get: (url: string |null) => of(RAWFORECASTS)
} as HttpClient;
*/
describe('Weather', () => {
  let service: Weather;
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      
    });
    
    service = TestBed.inject(Weather);
  });

  it('should be created', () => {
    //console.log('Testing the abstract service, weather. ');
    expect(service).toBeTruthy();
  });

    it('should find a known geoCode', () => {
    //console.log('Testing the abstract service, weather. ');
    let geoCode = service.getGeoCodeInfoFromZipWithKnownGeoCodes(signal('59829'));
    expect(geoCode?.name).toEqual('Ravalli County');
  });

});
