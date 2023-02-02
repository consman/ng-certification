import {TestBed, waitForAsync} from '@angular/core/testing';
import { WeatherService } from './weather.service';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LOCATIONS} from './mock-data';
import {Location} from "./location";
import {Subscription} from "rxjs";

export const FAKE_HTTP_CLIENT_LOCATIONS = {
  get: (url:string|null) => of(LOCATIONS)
} as HttpClient;


describe('WeatherService', () => {
  let service: WeatherService =new WeatherService(FAKE_HTTP_CLIENT_LOCATIONS);
  let subscription: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ {provide: HttpClient, useValue: FAKE_HTTP_CLIENT_LOCATIONS}  ]
    });
    service = TestBed.inject(WeatherService);
    service.locations = LOCATIONS;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('validates a zip code',()=>{
    expect(service.validateZip('94930')).toEqual(true);
  });

  it('reverts a location',()=>{
    expect(service.locations.length).toEqual(3);
    service.revertLocation(LOCATIONS[1],"94903");
    expect(service.locations.length).toEqual(2);
  });

});
