import {Current, Daily, RawForecast} from "./rawforecast";

export class RawForecastImpl implements RawForecast {
  current: Current;
  daily: Daily[];
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
}
