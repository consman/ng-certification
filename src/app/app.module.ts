import {Component, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { SearchComponent } from './search/search.component';
import { LocationComponent } from './location/location.component';
import { FivedayforecastComponent } from './fivedayforecast/fivedayforecast.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {WeatherService} from './weather.service';
import {environment} from '../environments/environment';
import {weatherServiceFactory} from "./weatherservice.factory";

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule, AppRoutingModule, HttpClientModule],
  declarations: [ AppComponent, HelloComponent, SearchComponent, LocationComponent, FivedayforecastComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ {provide: WeatherService, useFactory: (isProd: boolean, http: HttpClient)=> weatherServiceFactory(isProd, http), deps: ['IS_PROD_ENVIRONMENT',HttpClient]},
    {provide: 'IS_PROD_ENVIRONMENT', useValue: environment.production},
    {provide: 'http', useValue: HttpClient}]
})
export class AppModule { }
