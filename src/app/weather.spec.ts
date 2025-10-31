import { TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection } from '@angular/core';
import { Weather } from './weather';

import { environment } from '../environments/environment';
import { weatherServiceFactory } from './weatherservice.factory';
import {HttpClient} from '@angular/common/http';
import {RAWFORECASTS, RAWLOCATIONS} from './mock-data'; 
import { of } from 'rxjs';


export const FAKE_HTTP_CLIENT_LOCATIONS = {
  get: (url: string |null) => of(RAWLOCATIONS)
} as HttpClient;

export const FAKE_HTTP_CLIENT_FORECASTS = {
  get: (url: string |null) => of(RAWFORECASTS)
} as HttpClient;

describe('Weather', () => {
  let service: Weather;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(),{provide: HttpClient, useValue: {FAKE_HTTP_CLIENT_FORECASTS, FAKE_HTTP_CLIENT_LOCATIONS} },
        {provide: Weather, useFactory: weatherServiceFactory, deps: ['IS_PROD_ENVIRONMENT']},
        {provide: 'IS_PROD_ENVIRONMENT', useValue: environment.production},
        {provide: Location, useValue: RAWLOCATIONS[0]}]
    });
    service = TestBed.inject(Weather);
  });

  it('should be created', () => {
    console.log('Testing the abstract service, weather. ');
    expect(service).toBeTruthy();
  });
});
