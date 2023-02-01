import {TestBed, waitForAsync} from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { WeatherServiceAdapter } from './weatherServiceAdapter';
import {HttpClient} from '@angular/common/http';
import {of} from "rxjs";
import {LOCATIONS} from "./mock-data";
import {Subscription} from "rxjs";

export const FAKE_HTTP_CLIENT_LOCATIONS = {
  get: (url:string|null) => of(LOCATIONS)
} as HttpClient;


describe ( 'WeatherServiceAdapter',()=>{
  let wservice: WeatherService = new WeatherService(FAKE_HTTP_CLIENT_LOCATIONS);
  let service: WeatherServiceAdapter;
  let subscription: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ {provide: HttpClient, useValue: FAKE_HTTP_CLIENT_LOCATIONS},
        {provide:WeatherService, useValue: wservice},
        {provide:WeatherServiceAdapter, useValue: service}]
    });
    service = new WeatherServiceAdapter(); //TestBed.inject(WeatherServiceAdapter);
    wservice.locations=LOCATIONS;
    service.setWeatherService(wservice);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('validates a zip code',()=>{
    expect(service.validateZip('94930')).toEqual(true);
  });

  it('searches for zips',()=>{
    expect(service.findLocationByZipcode("94903",subscription).name).toEqual("Loctwo");
  });

});
