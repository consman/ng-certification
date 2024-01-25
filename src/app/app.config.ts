import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { WeatherService } from './weather.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { weatherServiceFactory } from './weatherservice.factory';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  
  providers: [provideRouter(routes), provideHttpClient(),
    {provide: WeatherService, useFactory: (isProd: boolean, http: HttpClient)=> weatherServiceFactory(isProd, http), deps: ['IS_PROD_ENVIRONMENT',HttpClient]}, 
    {provide: 'IS_PROD_ENVIRONMENT', useValue: environment.production},
    {provide: 'http', useValue: HttpClient},
  ]
};
