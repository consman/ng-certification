import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { SearchComponent } from './search.component';
import {WeatherService} from '../weather.service';
import {FORECAST, LOCATIONS} from '../mock-data';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export const FAKE_HTTP_CLIENT_FORECASTS = {
  get: (url:string|null) => of(FORECAST)
} as HttpClient;

export const FAKE_HTTP_CLIENT_LOCATIONS = {
  get: (url: string |null) => of(LOCATIONS)
} as HttpClient;


describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;


  beforeEach(async () => {
    const weatherService = new WeatherService(FAKE_HTTP_CLIENT_FORECASTS);
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      providers: [{provide: HttpClient, useValue: {FAKE_HTTP_CLIENT_FORECASTS, FAKE_HTTP_CLIENT_LOCATIONS} },
        {provide: WeatherService, useValue: weatherService},
        {provide: Location, useValue: LOCATIONS[0]}
      ]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validates a zip code', () => {
    expect(component.validateZip('94930')).toBeTruthy();
    expect(component.validateZip('94i30')).toBeFalse();
    expect(component.validateZip('9430')).toBeFalse();
  });


});
