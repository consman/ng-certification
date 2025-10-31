import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Fivedayforecast } from './fivedayforecast';
import {ActivatedRoute} from '@angular/router';
import {Weather} from '../weather';
import {weatherServiceFactory} from '../weatherservice.factory';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RAWFORECASTS, RAWLOCATIONS } from '../mock-data';
import { of } from 'rxjs';
import { ForecastImpl } from '../forecastImpl';

export const FAKE_HTTP_CLIENT_LOCATIONS = {
  get: (url: string |null) => of(RAWLOCATIONS)
} as HttpClient;

export const FAKE_HTTP_CLIENT_FORECASTS = {
  get: (url: string |null) => of(RAWFORECASTS)
} as HttpClient;

export const FAKE_ROUTE = {
  snapshot: { paramMap: {get: () => '95630+Folsom+38.6709+-121.1529'}}
};

describe('Fivedayforecast', () => {
  let component: Fivedayforecast;
  let fixture: ComponentFixture<Fivedayforecast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fivedayforecast],
      providers:[provideZonelessChangeDetection(),{provide: HttpClient, useValue: {FAKE_HTTP_CLIENT_FORECASTS, FAKE_HTTP_CLIENT_LOCATIONS}},
        {provide: Weather, useFactory: weatherServiceFactory, deps: ['IS_PROD_ENVIRONMENT']},
        {provide: 'IS_PROD_ENVIRONMENT', useValue: false},
        {provide: ForecastImpl, useValue: RAWFORECASTS[0]},
        {provide: ActivatedRoute, useValue: FAKE_ROUTE}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fivedayforecast);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log('Testing Component - Fivedayforecast');
    expect(component).toBeTruthy();
  });
});
