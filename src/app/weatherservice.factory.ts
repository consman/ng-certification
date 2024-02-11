import { Injectable } from '@angular/core';
import {ProdweatherService} from './Prodweather.service';
import {NonprodweatherService} from './nonprodweather.service';
import {HttpClient} from "@angular/common/http";

export function weatherServiceFactory(isProd: boolean, http: HttpClient): ProdweatherService | NonprodweatherService {

  if ( isProd ){
    console.log('use factory says GOING for PROD Weather service.');
    return new ProdweatherService(http);
  }
  else{
    return new NonprodweatherService();
  }
}
