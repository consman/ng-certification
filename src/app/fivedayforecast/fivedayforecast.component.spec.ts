import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FivedayforecastComponent } from './fivedayforecast.component';
import {of} from 'rxjs';
// import {RAWFORECASTS, RAWLOCATIONS} from '../mock-data';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {WeatherService} from "../weather.service";
import {weatherServiceFactory} from "../weatherservice.factory";
import {environment} from "../../environments/environment";
    /*
export const FAKE_HTTP_CLIENT_LOCATIONS = {
  get: (url:string|null) => of(RAWLOCATIONS)
} as HttpClient;

export const FAKE_HTTP_CLIENT_FORECASTS = {
  get: (url:string|null) => of(RAWFORECASTS)
} as HttpClient;
*/
export const FAKE_ROUTE = new ActivatedRoute();

describe('FivedayforecastComponent', () => {
  let component: FivedayforecastComponent;
  let fixture: ComponentFixture<FivedayforecastComponent>;

  beforeEach(async () => {
    //const weatherService = new ProdweatherService(); // FAKE_HTTP_CLIENT_FORECASTS);
    await TestBed.configureTestingModule({
      declarations: [ FivedayforecastComponent ],
      providers: [ // {provide: HttpClient, useValue: {FAKE_HTTP_CLIENT_FORECASTS, FAKE_HTTP_CLIENT_LOCATIONS} },
        {provide: WeatherService, useFactory: weatherServiceFactory, deps: ['IS_PROD_ENVIRONMENT']},
        {provide: 'IS_PROD_ENVIRONMENT', useValue: environment.production},
        {provide: ActivatedRoute,  useValue: FAKE_ROUTE},
        {provide: Router, useValue: ''}
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
    expect(component.readyToCallService).toEqual(true);
  });

  it('should have a location', () => {
    expect(component.location.zip).toEqual('95630');
  });

  it('can convert spaces to dashes', () => {
      expect(component.dashesToSpaces('Saint-Croy')).toEqual('Saint Croy');
  });

});
