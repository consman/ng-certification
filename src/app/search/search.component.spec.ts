import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { SearchComponent } from './search.component';
import {WeatherService} from '../weather.service';
import {FORECASTS, LOCATIONS} from '../mock-data';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {FAKE_HTTP_CLIENT_FORECASTS} from "../fivedayforecast/fivedayforecast.component.spec";

export const FAKE_HTTP_CLIENT_LOCATIONS = {
  get: (url:string|null) => of(LOCATIONS)
} as HttpClient;

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let weatherService = new WeatherService(FAKE_HTTP_CLIENT_LOCATIONS);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      providers: [{provide: HttpClient, useValue: {FAKE_HTTP_CLIENT_FORECASTS, FAKE_HTTP_CLIENT_LOCATIONS} },
        {provide: WeatherService, useValue: weatherService},
        {provide: Location, useValue: LOCATIONS[0]}
      ]
    })
    .compileComponents();
    //weatherService.locations=LOCATIONS;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
