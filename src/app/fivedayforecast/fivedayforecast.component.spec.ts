import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FivedayforecastComponent } from './fivedayforecast.component';

import {ActivatedRoute} from '@angular/router';
import {WeatherService} from '../weather.service';
import {weatherServiceFactory} from '../weatherservice.factory';
import {environment} from '../../environments/environment';
import { HttpClient, provideHttpClient } from '@angular/common/http';
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

describe('FivedayforecastComponent', () => {
  let component: FivedayforecastComponent;
  let fixture: ComponentFixture<FivedayforecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FivedayforecastComponent],
      providers: [{provide: HttpClient, useValue: {FAKE_HTTP_CLIENT_FORECASTS, FAKE_HTTP_CLIENT_LOCATIONS} },
        {provide: WeatherService, useFactory: weatherServiceFactory, deps: ['IS_PROD_ENVIRONMENT']},
        {provide: 'IS_PROD_ENVIRONMENT', useValue: environment.production},
        {provide: ForecastImpl, useValue: RAWFORECASTS[0]},
        {provide: ActivatedRoute, useValue: FAKE_ROUTE}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FivedayforecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a location', () => {
    expect(component.location.zip).toEqual('95630');
  });

  it('can convert spaces to dashes', () => {
      expect(component.dashesToSpaces('Saint-Croy')).toEqual('Saint Croy');
  });
});
