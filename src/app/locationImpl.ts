import {Location} from './location';
import {Forecast} from './forecast';

export class LocationImpl implements Location {
  forecasts: Forecast[];
  name: string;
  zip: string;
  lat: number;
  lon: number;
};
