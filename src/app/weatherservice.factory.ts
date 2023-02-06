import {ProdweatherService} from './Prodweather.service';
import {HttpClient} from '@angular/common/http';
import {NonprodweatherService} from './nonprodweather.service';
import {HttpHandlerImpl} from './HttpHandlerImpl';

export function weatherServiceFactory(isProd: boolean): ProdweatherService | NonprodweatherService {

  if ( isProd ){
    console.log('use factory says GOING for PROD Weather service.');
    // TODO Fix this - it does not work! See Al's solution to the paramMap mocking issue
    return new ProdweatherService(new HttpClient(new HttpHandlerImpl()));
  }
  else{
    console.log('use factory says GOING for NON PROD weather service.');
    return new NonprodweatherService();
  }
}
