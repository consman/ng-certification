import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FivedayforecastComponent } from './fivedayforecast.component';
import {of} from 'rxjs';
import {FORECASTS, LOCATIONS} from '../mock-data';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {WeatherService} from '../weather.service';

export const FAKE_HTTP_CLIENT_LOCATIONS = {
  get: (url:string|null) => of(LOCATIONS)
} as HttpClient;

export const FAKE_HTTP_CLIENT_FORECASTS = {
  get: (url:string|null) => of(FORECASTS)
} as HttpClient;

export const FAKE_ROUTE = new ActivatedRoute();
FAKE_ROUTE.snapshot = new ActivatedRouteSnapshot();
FAKE_ROUTE.snapshot.params =["zipcode","96760"];

describe('FivedayforecastComponent', () => {
  let component: FivedayforecastComponent;
  let fixture: ComponentFixture<FivedayforecastComponent>;
  let weatherService = new WeatherService(FAKE_HTTP_CLIENT_LOCATIONS);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FivedayforecastComponent ],
      providers: [ {provide: HttpClient, useValue: {FAKE_HTTP_CLIENT_FORECASTS, FAKE_HTTP_CLIENT_LOCATIONS} },
        {provide: ActivatedRoute, useValue: FAKE_ROUTE},
        {provide: Router, useValue: ""},
        {provide: WeatherService, useValue: weatherService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FivedayforecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
