import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import { environment } from '../environments/environment';
import { weatherServiceFactory } from './weatherservice.factory';
import {HttpClient} from '@angular/common/http';
import {RAWFORECASTS, RAWLOCATIONS} from './mock-data'; 
import { from, of } from 'rxjs';


export const FAKE_HTTP_CLIENT_LOCATIONS = {
  get: (url: string |null) => of(RAWLOCATIONS)
} as HttpClient;

export const FAKE_HTTP_CLIENT_FORECASTS = {
  get: (url: string |null) => of(RAWFORECASTS)
} as HttpClient;


describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [  {provide: HttpClient, useValue: {FAKE_HTTP_CLIENT_FORECASTS, FAKE_HTTP_CLIENT_LOCATIONS} },
        {provide: WeatherService, useFactory: weatherServiceFactory, deps: ['IS_PROD_ENVIRONMENT']},
        {provide: 'IS_PROD_ENVIRONMENT', useValue: environment.production},
        {provide: Location, useValue: RAWLOCATIONS[0]}
      ]
    });
    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
