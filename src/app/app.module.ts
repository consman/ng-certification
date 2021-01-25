import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { SearchComponent } from './search/search.component';
import { LocationComponent } from './location/location.component';
import { FivedayforecastComponent } from './fivedayforecast/fivedayforecast.component';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule, AppRoutingModule, HttpClientModule],
  declarations: [ AppComponent, HelloComponent, SearchComponent, LocationComponent, FivedayforecastComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
