import {Clouds, Coord, Location, Main, Sys, Weather, Wind} from './location';
import {ForecastImpl} from './ForecastImpl';
export class LocationImpl implements Location {
  constructor() {
    this.coord = new CoordImpl();
  }
  base: string;
  clouds: Clouds;
  cod: number;
  coord: Coord;
  dt: number;
  id: number;
  main: Main;
  name: string;
  sys: Sys;
  timezone: number;
  visibility: number;
  weather: Weather[];
  wind: Wind;
  zip: string;
  forecasts: ForecastImpl[];
}

export class CoordImpl implements Coord{
  lat: number;
  lon: number;
}
