import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LOCATIONS} from './mock-data';
export const FAKE_HTTP_CLIENT_LOCATIONS = {
  get: (url:string|null) => of(LOCATIONS)
} as HttpClient;


describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ {provide: HttpClient, useValue: FAKE_HTTP_CLIENT_LOCATIONS}  ]
    });
    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
