import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Search } from './search';
import { Weather } from '../weather';
import { weatherServiceFactory } from '../weatherservice.factory';
import { Nonprodweather } from '../nonprodweather';

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
      
      
      await fixture.whenStable();
    });

    it('should create', () => {
      component.weatherService = TestBed.runInInjectionContext(() => new Nonprodweather());
        expect(component).toBeTruthy(); 
    });

    it('should add a new location', () => {
      component.weatherService = TestBed.runInInjectionContext(() => new Nonprodweather());
      expect(component.addNewLocation('90810'));
      expect(component.lastSearchResponseSig()?.lokation.oneCallResponse.lat ==  33.8193); //.length == 2);//
    });

});
