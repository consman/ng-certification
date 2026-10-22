import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from './location';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Weather } from '../weather';
import { Daum, WeatherB, Temp, FeelsLike } from '../funTypes';
import { environment } from '../../environments/environment';
import { Nonprodweather } from '../nonprodweather';


export const FAKE_ROUTE = {
  snapshot: { paramMap: {get: () => '95630+Folsom+38.6709+-121.1529'}}
};


describe('Location', () => {
  let component: Location;
  let fixture: ComponentFixture<Location>;
  let weather:Nonprodweather;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Location],
      providers:[
        Nonprodweather, 
        {provide: 'IS_PROD_ENVIRONMENT', useValue: environment.production},
        {provide: ActivatedRoute, useValue: FAKE_ROUTE}
      ]

    }).compileComponents();

    fixture = TestBed.createComponent(Location);
    component = fixture.componentInstance;

    component.weatherService = TestBed.runInInjectionContext(() => new Nonprodweather());

    let bco = component.lokationSig();
    if(bco) {
      bco.jeocode.name = 'Folsom';

      let myFeelsLike:FeelsLike ={
        day: 0,
        night: 0,
        eve: 0,
        morn: 0
      };

      let myTemp:Temp ={
        day: 0,
        min: 0,
        max: 0,
        night: 0,
        eve: 0,
        morn: 0
      };

      let myweath:WeatherB[] = [{
        id: 0,
        main: '',
        description: '',
        icon: ''
      }];

      let myDaum:Daum[] = [{
        dt: 0,
        sunrise: 0,
        sunset: 0,
        moonrise: 0,
        moonset: 0,
        moon_phase: 0,
        temp: myTemp,
        feels_like: myFeelsLike,
        pressure: 0,
        humidity: 0,
        dew_point: 0,
        wind_speed: 0,
        wind_deg: 0,
        weather: myweath,
        clouds: 0,
        pop: 0
      }];

      
      bco.oneCallResponse.data = myDaum;
      bco.oneCallResponse.data[0].weather[0].main = 'Clouds';
      bco.oneCallResponse.data[0].temp.day = 49.06;
      bco.oneCallResponse.data[0].temp.min = 41.99;
      bco.oneCallResponse.data[0].temp.max = 60.49;
      bco.jeocode.lon = -121.1529;
      bco.jeocode.lat = 38.6709;
      bco.jeocode.zip = '95630';  
    }  
    await fixture.whenStable();
  });

  it('should create', () => {
     //console.log('Testing component - Location');
    expect(component).toBeTruthy();
  });

    it('removes the zip from local storage when closing', () => {
    localStorage.setItem('storedZipCode' + '95630', '95630');
    component.handleClose();

    let found = false;
    for (const localStorageKey in localStorage) {
      if (localStorageKey.startsWith('storedZipCode')){
        if (localStorage.getItem(localStorageKey) === 'storedZipCode95630'){
          //console.log('Testing LocationComponent');
          found = true;
        }
      }
    }
    expect(found ).toBeFalsy();
  }); 

});


