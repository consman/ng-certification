import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { Prodweather } from './prodweather';

import {HttpClient} from '@angular/common/http';
import {RAWFORECASTS, RAWLOCATIONS} from './mock-data'; 
import { of } from 'rxjs';

export const FAKE_HTTP_CLIENT_LOCATIONS = {
  get: (url: string |null) => of(RAWLOCATIONS)
} as HttpClient;

export const FAKE_HTTP_CLIENT_FORECASTS = {
  get: (url: string |null) => of(RAWFORECASTS)
} as HttpClient;

describe('Prodweather', () => {
  let service: Prodweather;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(),{provide: HttpClient, useValue: {FAKE_HTTP_CLIENT_FORECASTS, FAKE_HTTP_CLIENT_LOCATIONS} },
                  {provide: Location, useValue: RAWLOCATIONS[0]}]
    });

    service = TestBed.inject(Prodweather);
  });

  it('should be created', () => {

    console.log('Testing the service, prodweather. ');
    expect(service).toBeTruthy();
  });
});
