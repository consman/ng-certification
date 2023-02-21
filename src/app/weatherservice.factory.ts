import {ProdweatherService} from './Prodweather.service';
import {NonprodweatherService} from './nonprodweather.service';

export function weatherServiceFactory(isProd: boolean): ProdweatherService | NonprodweatherService {

  if ( isProd ){
    // const http: HttpClient; <<-- does not work because the HttpClient needs to be initialized.
    console.log('use factory says GOING for PROD Weather service.');
    // TODO Fix this - it does not work! See Al's solution to the paramMap mocking issue
    // return new ProdweatherService(http);
    return new ProdweatherService();
  }
  else{
    console.log('use factory says GOING for NON PROD weather service.');
    return new NonprodweatherService();
  }
}
