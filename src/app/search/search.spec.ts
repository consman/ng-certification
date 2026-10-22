import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Search } from './search';
import { Weather } from '../weather';
//import { environment } from '../../environments/environment';
import { weatherServiceFactory } from '../weatherservice.factory';
import {HttpClient} from '@angular/common/http';
import { Nonprodweather } from '../nonprodweather';


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
    let weather: Nonprodweather;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [Search] ,
        providers: [Nonprodweather]        
      }).compileComponents();

      fixture = TestBed.createComponent(Search);
      component = fixture.componentInstance;
      await fixture.whenStable();
    });

    it('should create', () => {
      component.weatherService = TestBed.runInInjectionContext(() => new Nonprodweather());
        expect(component).toBeTruthy(); 
    });

    it('should add a new location', () => {
      component.weatherService = TestBed.runInInjectionContext(() => new Nonprodweather());
      expect(component.addNewLocation('90810'));
      expect(component.weatherService.lokationsSig()[0]?.dt == 1792683866818 );
    });

});
