import { TestBed } from '@angular/core/testing';

import { ProdweatherService } from './Prodweather.service';

import {HttpClient} from '@angular/common/http';
import {RAWFORECASTS, RAWLOCATIONS} from './mock-data'; 
import { of } from 'rxjs';

export const FAKE_HTTP_CLIENT_LOCATIONS = {
  get: (url: string |null) => of(RAWLOCATIONS)
} as HttpClient;

export const FAKE_HTTP_CLIENT_FORECASTS = {
  get: (url: string |null) => of(RAWFORECASTS)
} as HttpClient;


describe('ProdweatherService', () => {
  let service: ProdweatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: HttpClient, useValue: {FAKE_HTTP_CLIENT_FORECASTS, FAKE_HTTP_CLIENT_LOCATIONS} },
                  {provide: Location, useValue: RAWLOCATIONS[0]}]
    });
    service = TestBed.inject(ProdweatherService);
  });

  it('should be created', () => {
    console.log('Testing ProdweatherService');
    expect(service).toBeTruthy();
  });
});
