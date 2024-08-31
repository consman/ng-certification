import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationComponent } from './location.component';
import {LocationImpl} from '../locationImpl';
import {WeatherService} from "../weather.service";
import {weatherServiceFactory} from "../weatherservice.factory";
import {environment} from "../../environments/environment";
import {WeatherImpl} from "../forecastImpl";
import {Main} from "../location";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

export const FAKE_ROUTE = {
  snapshot: { paramMap: {get: () => '95630+Folsom+38.6709+-121.1529'}}
};

describe('LocationComponent', () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationComponent, RouterModule, CommonModule, NgIf],
      providers: [
        {provide: WeatherService, useFactory: weatherServiceFactory, deps: ['IS_PROD_ENVIRONMENT']},
        {provide: 'IS_PROD_ENVIRONMENT', useValue: environment.production},
        {provide: ActivatedRoute, useValue: FAKE_ROUTE}]
    })
    .compileComponents();

    //fixture = TestBed.createComponent(LocationComponent);
    //component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;
    const tempLoc = new LocationImpl();
    const tempLocArray = [];
    tempLocArray.push(tempLoc);
    component.location = tempLoc;
    tempLoc.name = 'Folsom';
    tempLoc.weather = new Array<WeatherImpl>();
    tempLoc.weather.push(new WeatherImpl());
    tempLoc.weather[0].main = 'Clouds';
    tempLoc.main = new MainImpl();
    tempLoc.main.temp = 49.06;
    tempLoc.main.temp_min = 41.99;
    tempLoc.main.temp_max = 60.49;
    tempLoc.coord.lon = -121.1529;
    tempLoc.coord.lat = 38.6709;
    tempLoc.zip = '95630';
    component.locations = tempLocArray;
    fixture.detectChanges();
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('removes the zip from local storage when closing', () => {
    localStorage.setItem('storedZipCode' + '95630', '95630');
    component.handleClose();

    let found = false;
    for (const localStorageKey in localStorage) {
      if (localStorageKey.startsWith('storedZipCode')){
        if (localStorage.getItem(localStorageKey) === 'storedZipCode95630'){
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

