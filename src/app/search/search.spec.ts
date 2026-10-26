import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Search } from './search';
import { Weather } from '../weather';
//import { environment } from '../../environments/environment';
import { weatherServiceFactory } from '../weatherservice.factory';
import {HttpClient} from '@angular/common/http';
import { Nonprodweather } from '../nonprodweather';
import { initialGeoCode, initialOneCallResponse, initialSearchResponse } from '../refData';


//import {RAWFORECASTS, RAWLOCATIONS} from '../mock-data';
//import { from, of } from 'rxjs';
/*
export const FAKE_HTTP_CLIENT_LOCATIONS = {
  get: (url: string |null) => of(RAWLOCATIONS)
} as HttpClient;

export const FAKE_HTTP_CLIENT_FORECASTS = {
  get: (url: string |null) => of(RAWFORECASTS)
} as HttpClient;
*/
describe('Search', () => {
  
    let component: Search;
    let fixture: ComponentFixture<Search>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [Search] ,
        providers: [{provide: Weather, useFactory: weatherServiceFactory, deps: ['IS_PROD_ENVIRONMENT']},
        {provide: 'IS_PROD_ENVIRONMENT', useValue: false}]        
      }).compileComponents();

      fixture = TestBed.createComponent(Search);
      component = fixture.componentInstance;
      /*
      let tempJeo = initialGeoCode;
      tempJeo.zip = '90810';
      let tempOcr = initialOneCallResponse;
      let tempLok = {jeocode:tempJeo, oneCallResponse:tempOcr, dt: 1792683866818};
      let searchResponse = initialSearchResponse;
      searchResponse.lokation = tempLok;
      component.weatherService.searchResponses =[];
      component.weatherService.searchResponses.push(searchResponse);
*/
      await fixture.whenStable();
    });

    it('should create', () => {
      component.weatherService = TestBed.runInInjectionContext(() => new Nonprodweather());
        expect(component).toBeTruthy(); 
    });

    it('should add a new location', () => {
      component.weatherService = TestBed.runInInjectionContext(() => new Nonprodweather());
      expect(component.addNewLocation('90810'));
      expect(component.searchResponseSig()?.lokation.oneCallResponse.lat ==  33.8193); //.length == 2);//
    });

});
