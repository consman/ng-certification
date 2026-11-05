import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Fivedayforecast } from './fivedayforecast';
import {ActivatedRoute} from '@angular/router';
import {Weather} from '../weather';
import {weatherServiceFactory} from '../weatherservice.factory';
import { Nonprodweather } from '../nonprodweather';
import { initialGeoCode, initialOneCallResponse, initialSearchResponse } from '../refData';

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
        {provide: Weather, useFactory: weatherServiceFactory, deps: ['IS_PROD_ENVIRONMENT']}, 
        {provide: 'IS_PROD_ENVIRONMENT', useValue: false}, 
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
