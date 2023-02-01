import {TestBed, waitForAsync} from '@angular/core/testing';
import { WeatherService } from './weather.service';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LOCATIONS} from './mock-data';
import {Location} from "./location";
import {subscribeOn} from "rxjs/operators";

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

  it('can use the adapter',()=>{
    expect(service.getWeatherServiceAdapter()).toBeTruthy();
  });

  /*
  it('can get a location from the service',()=>{
    let result: Location;
    waitForAsync(()=>{
      service.getLocationFromService("94903").subscribe({
        next:(v)=>{
          result = v;
          console.log(' the name is: '+v);
        },
        error:()=>{
          console.error('Error');
        },
        complete:()=>{
          console.log('complete');
        }
      });
    });
    console.log(' result = ' + result);
    expect(result.name).toEqual("Loctwo");
  });

   */
});
