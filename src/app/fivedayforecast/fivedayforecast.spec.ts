import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Fivedayforecast } from './fivedayforecast';
import {ActivatedRoute} from '@angular/router';
import {Weather} from '../weather';
import {weatherServiceFactory} from '../weatherservice.factory';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
//import { RAWFORECASTS, RAWLOCATIONS } from '../mock-data';
import { of } from 'rxjs';
import { ForecastImpl } from '../forecastImpl';
import { Nonprodweather } from '../nonprodweather';
import { initialGeoCode, initialLokation, initialOneCallResponse, initialSearchResponse } from '../refData';
/*
export const FAKE_HTTP_CLIENT_LOCATIONS = {
  get: (url: string |null) => of(RAWLOCATIONS)
} as HttpClient;

export const FAKE_HTTP_CLIENT_FORECASTS = {
  get: (url: string |null) => of(RAWFORECASTS)
} as HttpClient;
*/
//{"zip":"90810","name":"Carson","lat":33.8193,"lon":-118.2325,"country":"US"}
export const FAKE_ROUTE = {
  snapshot: { paramMap: {get: () => '90810+Carson+33.8193+-118.232'}}
};

describe('Fivedayforecast', () => {
  let component: Fivedayforecast;
  let fixture: ComponentFixture<Fivedayforecast>;
  let weatherService: Nonprodweather;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fivedayforecast] ,
      providers:[ 
        {provide: Weather, useValue:weatherService}, 
        {provide: ActivatedRoute, useValue: FAKE_ROUTE}] 
    }).compileComponents();

    fixture = TestBed.createComponent(Fivedayforecast);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(Nonprodweather);
    //component.Weather = TestBed.runInInjectionContext(() => new Nonprodweather());
    
    let tempJeo = initialGeoCode;
    tempJeo.zip = '90810';
    let tempOcr = initialOneCallResponse;
    let tempLok = {jeocode:tempJeo, oneCallResponse:tempOcr, dt: new Date().getTime()};
    let searchResponse = initialSearchResponse;
    
    //component.weatherService.getSearchResponse().push(searchResponse);//update(loks => [...loks, tempLok]);
    await fixture.whenStable();
  });

  it('should create', () => {
    //console.log('Testing Component - Fivedayforecast');
    expect(component).toBeTruthy();
  });
});
