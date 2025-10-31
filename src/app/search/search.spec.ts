import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Search } from './search';
import { Weather } from '../weather';
//import { environment } from '../../environments/environment';
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
describe('Search', () => {
  let component: Search;
  let fixture: ComponentFixture<Search>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Search],
      providers: [ provideZonelessChangeDetection(), 
        {provide: HttpClient, useValue: {FAKE_HTTP_CLIENT_FORECASTS, FAKE_HTTP_CLIENT_LOCATIONS} },
        {provide: Weather, useFactory: weatherServiceFactory, deps: ['IS_PROD_ENVIRONMENT']},
        {provide: 'IS_PROD_ENVIRONMENT', useValue: false},
        {provide: Location, useValue: RAWLOCATIONS[0]}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Search);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log('Testing the component - Search. ');
    expect(component).toBeTruthy();
  });
});
