import { Location} from './location';
import { Forecast} from './forecast';

export const LOCATIONS: Location[]=[
  {
    "name":"Locone",
    "zip":"95630",
    "lon": 5,
    "lat": 9,
    forecasts:[]
  },
  {
    "name":"Loctwo",
    "zip":"94903",
    "lon": 7,
    "lat": 11,
    forecasts:[]
  },
];

export const FORECASTS: Forecast[]=[
  {"day": new Date(),
   "description":"ForecastOne",
    "current": 77,
    "max": 117,
    "min": 29,
    "forecastIcon":"iconstring"
  },
  {"day": new Date(),
    "description":"ForecastTwo",
    "current": 72,
    "max": 112,
    "min": 24,
    "forecastIcon":"iconstringtwo"
  }
];
