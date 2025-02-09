import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { WeatherService } from '../weather.service';
import { environment } from '../../environments/environment';
import { weatherServiceFactory } from '../weatherservice.factory';
import {HttpClient} from '@angular/common/http';

import {RAWFORECASTS, RAWLOCATIONS} from '../mock-data';
import { from, of } from 'rxjs';

export const FAKE_HTTP_CLIENT_LOCATIONS = {
  get: (url: string |null) => of(RAWLOCATIONS)
} as HttpClient;

export const FAKE_HTTP_CLIENT_FORECASTS = {
  get: (url: string |null) => of(RAWFORECASTS)
} as HttpClient;

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
      providers: [  {provide: HttpClient, useValue: {FAKE_HTTP_CLIENT_FORECASTS, FAKE_HTTP_CLIENT_LOCATIONS} },
        {provide: WeatherService, useFactory: weatherServiceFactory, deps: ['IS_PROD_ENVIRONMENT']},
        {provide: 'IS_PROD_ENVIRONMENT', useValue: false},
        {provide: Location, useValue: RAWLOCATIONS[0]}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log('Testing SearchComponent..')
    expect(component).toBeTruthy();
  });

  it('validates a zip code', () => {
    expect(component.validateZip('94930')).toBeTruthy();
    expect(component.validateZip('94i30')).toBeFalse();
    expect(component.validateZip('9430')).toBeFalse();
  });
});
