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
import {weatherServiceFactory} from './weatherservice.factory';
import {environment} from '../environments/environment';

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule, AppRoutingModule, HttpClientModule],
  declarations: [ AppComponent, HelloComponent, SearchComponent, LocationComponent, FivedayforecastComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ {provide: WeatherService, useFactory: weatherServiceFactory, deps: ['IS_PROD_ENVIRONMENT']},
    {provide: 'IS_PROD_ENVIRONMENT', useValue: environment.production},
    {provide: 'http', useValue: HttpClient}]
})
export class AppModule { }


