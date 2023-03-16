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
import {ProdweatherService} from "./Prodweather.service";
import {NonprodweatherService} from "./nonprodweather.service";

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule, AppRoutingModule, HttpClientModule],
  declarations: [ AppComponent, HelloComponent, SearchComponent, LocationComponent, FivedayforecastComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ {provide: WeatherService, useFactory: (isProd: boolean, http: HttpClient)=>{
      if ( isProd ){
        console.log('use factory says GOING for PROD Weather service.');
        return new ProdweatherService(http);
      }
      else{
        console.log('use factory says GOING for NON PROD weather service.');
        return new NonprodweatherService();
      }
    }, deps: ['IS_PROD_ENVIRONMENT',HttpClient]},
    {provide: 'IS_PROD_ENVIRONMENT', useValue: environment.production},
    {provide: 'http', useValue: HttpClient}]
})
export class AppModule { }
