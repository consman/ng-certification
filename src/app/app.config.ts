import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { withEventReplay } from '@angular/platform-browser';
import { Weather } from './weather';
import { environment } from '../environments/environment';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { weatherServiceFactory } from './weatherservice.factory';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    //provideClientHydration(withEventReplay()),
    {provide: Weather, useFactory: (isProd: boolean, http: HttpClient)=> weatherServiceFactory(isProd, http), deps: ['IS_PROD_ENVIRONMENT',HttpClient]}, 
    {provide: 'IS_PROD_ENVIRONMENT', useValue: environment.production},
    {provide: 'http', useValue: HttpClient}
  ]
};
