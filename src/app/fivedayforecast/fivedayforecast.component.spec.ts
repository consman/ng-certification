import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FivedayforecastComponent } from './fivedayforecast.component';
import {of} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {WeatherService} from "../weather.service";
import {weatherServiceFactory} from "../weatherservice.factory";
import {environment} from "../../environments/environment";


export const FAKE_ROUTE = {
  snapshot: { paramMap: of({get: () => '95630+Folsom+38.6709+-121.1529'}) }
};

describe('FivedayforecastComponent', () => {
  let component: FivedayforecastComponent;
  let fixture: ComponentFixture<FivedayforecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FivedayforecastComponent ],
      providers: [
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

  /*
  //TODO Fix these when we can mock the snapshot
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
*/
});
