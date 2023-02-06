import {Location} from './location';
import {ForecastImpl} from "./forecastImpl";

export class LocationImpl implements Location {
  forecasts: ForecastImpl[];
  name: string;
  zip: string;
  lat: number;
  lon: number;
};
