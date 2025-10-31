import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection } from '@angular/core';
import { Locationn } from './location';

import { ActivatedRoute, RouterModule } from '@angular/router';
import { Weather } from '../weather';
import { weatherServiceFactory } from '../weatherservice.factory';
import { environment } from '../../environments/environment';
import { WeatherImpl } from '../forecastImpl';
import { Main } from '../location';

export const FAKE_ROUTE = {
  snapshot: { paramMap: {get: () => '95630+Folsom+38.6709+-121.1529'}}
};

describe('Locationn', () => {
  let component: Locationn;
  let fixture: ComponentFixture<Locationn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Locationn],
      providers:[provideZonelessChangeDetection(),
        {provide: Weather, useFactory: weatherServiceFactory, deps: ['IS_PROD_ENVIRONMENT']},
        {provide: 'IS_PROD_ENVIRONMENT', useValue: environment.production},
        {provide: ActivatedRoute, useValue: FAKE_ROUTE}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Locationn);
    component = fixture.componentInstance;
    component.location().name = 'Folsom';
    component.location().weather = new Array<WeatherImpl>();
    component.location().weather.push(new WeatherImpl());
    component.location().weather[0].main = 'Clouds';
    component.location().main = new MainImpl();
    component.location().main.temp = 49.06;
    component.location().main.temp_min = 41.99;
    component.location().main.temp_max = 60.49;
    component.location().coord.lon = -121.1529;
    component.location().coord.lat = 38.6709;
    component.location().zip = '95630';    

    fixture.detectChanges();
  });

  it('should create', () => {
     console.log('Testing component - Location');
    expect(component).toBeTruthy();
  });

  it('removes the zip from local storage when closing', () => {
    localStorage.setItem('storedZipCode' + '95630', '95630');
    component.handleClose();

    let found = false;
    for (const localStorageKey in localStorage) {
      if (localStorageKey.startsWith('storedZipCode')){
        if (localStorage.getItem(localStorageKey) === 'storedZipCode95630'){
          console.log('Testing LocationComponent');
          found = true;
        }
      }
    }
    expect(found ).toBeFalse();
  }); 


});


export class MainImpl implements Main {
  feels_like!: number;
  humidity!: number;
  pressure!: number;
  temp!: number;
  temp_max!: number;
  temp_min!: number;

}
