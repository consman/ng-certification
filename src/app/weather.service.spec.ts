import {TestBed, waitForAsync} from '@angular/core/testing';
import { WeatherService } from './weather.service';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {FORECAST, LOCATIONS} from './mock-data';

export const FAKE_HTTP_CLIENT_LOCATIONS = {
  get: (url: string |null) => of(LOCATIONS)
} as HttpClient;

export const FAKE_HTTP_CLIENT_FORECASTS = {
  get: (url: string |null) => of(FORECAST)
} as HttpClient;

describe('WeatherService', () => {
  let service: WeatherService = new WeatherService(FAKE_HTTP_CLIENT_FORECASTS);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ {provide: HttpClient, useValue: {FAKE_HTTP_CLIENT_LOCATIONS, FAKE_HTTP_CLIENT_FORECASTS}}]
    });
    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

/*  Fix these after resolving HTTP mock issue

  it('gets the 5 day forecast', () => {
    service.location = new LocationImpl();
    service.location.lat = 38.6709;
    service.location.lon = -121.1529;
    service.getFiveDay(service.location);
  });

  it ('adds a new location', () => {
    const locations: Location [] = [];
    service.addNewLocation('95630', locations);
    expect(locations.length).toEqual(1);
  });
*/
});
