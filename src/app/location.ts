import {Forecast} from './forecast';

export interface Location {

  name: string;
  zip: string;
  lon: number;
  lat: number;

  forecasts: Forecast[];

}
