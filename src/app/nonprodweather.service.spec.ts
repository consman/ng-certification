import { TestBed } from '@angular/core/testing';

import { NonprodweatherService } from './nonprodweather.service';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
/*
import {RAWFORECASTS, RAWLOCATIONS} from './mock-data';

export const FAKE_HTTP_CLIENT_LOCATIONS = {
  get: (url: string |null) => of(RAWLOCATIONS)
} as HttpClient;

export const FAKE_HTTP_CLIENT_FORECASTS = {
  get: (url: string |null) => of(RAWFORECASTS)
} as HttpClient;
*/
describe('NonprodweatherService', () => {
  let service: NonprodweatherService = new NonprodweatherService(); // FAKE_HTTP_CLIENT_FORECASTS);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ] // {provide: HttpClient, useValue: {FAKE_HTTP_CLIENT_LOCATIONS, FAKE_HTTP_CLIENT_FORECASTS}}]
    });
    service = TestBed.inject(NonprodweatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
