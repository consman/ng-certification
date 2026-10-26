import { TestBed } from '@angular/core/testing';
import { Prodweather } from './prodweather';
import {HttpClient} from '@angular/common/http';
//import {RAWFORECASTS, RAWLOCATIONS} from './mock-data'; 
import { of } from 'rxjs';
import { Nonprodweather } from './nonprodweather';
/*
export const FAKE_HTTP_CLIENT_LOCATIONS = {
  get: (url: string |null) => of(RAWLOCATIONS)
} as HttpClient;

export const FAKE_HTTP_CLIENT_FORECASTS = {
  get: (url: string |null) => of(RAWFORECASTS)
} as HttpClient;
*/

describe('Prodweather', () => {
  let service: Prodweather;
  //let weather: Prodweather;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Prodweather);
  });

  it('should be created', () => {
    //console.log('Testing the service, prodweather. ');
    expect(service).toBeTruthy();
  });
});
