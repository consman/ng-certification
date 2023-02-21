import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { SearchComponent } from './search.component';
import {RAWFORECASTS, RAWLOCATIONS} from '../mock-data';

import {WeatherService} from "../weather.service";
import {weatherServiceFactory} from "../weatherservice.factory";
import {environment} from "../../environments/environment";

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;


  beforeEach(async () => {
    // const weatherService = new WeatherService(); //FAKE_HTTP_CLIENT_FORECASTS);
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      providers: [ // {provide: HttpClient, useValue: {FAKE_HTTP_CLIENT_FORECASTS, FAKE_HTTP_CLIENT_LOCATIONS} },
        {provide: WeatherService, useFactory: weatherServiceFactory, deps: ['IS_PROD_ENVIRONMENT']},
        {provide: 'IS_PROD_ENVIRONMENT', useValue: environment.production},
        {provide: Location, useValue: RAWLOCATIONS[0]}
      ]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validates a zip code', () => {
    expect(component.validateZip('94930')).toBeTruthy();
    expect(component.validateZip('94i30')).toBeFalse();
    expect(component.validateZip('9430')).toBeFalse();
  });


});
