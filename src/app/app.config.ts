import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { WeatherService } from './weather.service';
import { HttpClient } from '@angular/common/http';
import { weatherServiceFactory } from './weatherservice.factory';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  
  providers: [provideRouter(routes),
    //{provide: WeatherService, useFactory: (isProd: boolean, http: HttpClient)=> weatherServiceFactory(isProd, http), deps: ['IS_PROD_ENVIRONMENT',HttpClient]}, // works well for everything in V16 - But in 17 unit tests work with non-prod, but not PROD or cypress which crash with ERROR NullInjectorError: R3InjectorError(Standalone[n])[n -> n -> n -> _HttpClient -> _HttpClient]: NullInjectorError: No provider for _HttpClient!
    {provide: WeatherService, useFactory: weatherServiceFactory, deps: ['IS_PROD_ENVIRONMENT','http']}, // V17: units tests and cypress both work, but not PROD which crashes with ERROR TypeError: this.http.get is not a function
    //{provide: WeatherService, useFactory: (isProd: boolean, http: HttpClient)=> weatherServiceFactory(isProd, http), deps: ['IS_PROD_ENVIRONMENT','http']}, // v!& works with non-prod, unit tests and cypress work ( but switching to PROD causes FivedayforecastComponent junits to fail and cypress to fail with timeouts and manual testing gives ERROR TypeError: this.http.get is not a function ) 
    {provide: 'IS_PROD_ENVIRONMENT', useValue: environment.production},
  {provide: 'http', useValue: HttpClient}
  ]
};
