import { Injectable } from '@angular/core';
import {Prodweather} from './prodweather';
import {Nonprodweather} from './nonprodweather';
import {HttpClient} from "@angular/common/http";

export function weatherServiceFactory(isProd: boolean, http: HttpClient): Prodweather | Nonprodweather {
  

  if ( isProd ){
    return new Prodweather();
  }
  else{
    console
    return new Nonprodweather();
  }
}
