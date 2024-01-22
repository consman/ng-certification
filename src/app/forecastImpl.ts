import {Current, Daily, FeelsLike, Forecast, Rain, Temp, Weather, Weather2} from './forecast';

export class ForecastImpl implements Forecast {
  current!: Current;
  daily!: Daily[];
  lat!: number;
  lon!: number;
  timezone!: string;
  timezone_offset!: number;
  weather!: Weather;
}

export class WeatherImpl implements Weather {
  description!: string;
  icon!: string;
  id!: number;
  main!: string;

}

export class CurrentImpl implements Current {
  clouds!: number;
  dew_point!: number;
  dt!: number;
  feels_like!: number;
  humidity!: number;
  pressure!: number;
  rain!: Rain;
  sunrise!: number;
  sunset!: number;
  temp!: number;
  uvi!: number;
  visibility!: number;
  weather!: Weather[];
  wind_deg!: number;
  wind_gust!: number;
  wind_speed!: number;

}

export class DailyImpl implements Daily{
  clouds!: number;
  dayOfWeek!: Date;
  dew_point!: number;
  dt!: number;
  feels_like!: FeelsLike;
  humidity!: number;
  moon_phase!: number;
  moonrise!: number;
  moonset!: number;
  pop!: number;
  pressure!: number;
  rain!: number;
  sunrise!: number;
  sunset!: number;
  temp!: Temp;
  uvi!: number;
  weather!: Weather2[];
  wind_deg!: number;
  wind_gust!: number;
  wind_speed!: number;
}

export class TempImpl implements Temp{
  day!: number;
  eve!: number;
  max!: number;
  min!: number;
  morn!: number;
  night!: number;
}

export class Weather2Impl implements Weather2{
  description!: string;
  icon!: string;
  id!: number;
  main!: string;
}

