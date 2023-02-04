import {Forecast} from './forecast';

export class ForecastImpl implements Forecast{
  current: number;
  day: Date;
  description: string;
  forecastIcon: string;
  max: number;
  min: number;
}
