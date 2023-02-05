import { Location} from './location';
import {Weather} from "./Weather";

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
  {
    "name":"Locthree",
    "zip":"96760",
    "lon": 9,
    "lat": 13,
    forecasts:[]
  }
];

export const FORECAST: Weather = {
    "lat": 38.6709,
    "lon": -121.1529,
    "timezone": "America/Los_Angeles",
    "timezone_offset": -28800,
    "current": {
      "dt": 1675555295,
      "sunrise": 1675523268,
      "sunset": 1675560554,
      "temp": 56.25,
      "feels_like": 55.18,
      "pressure": 1015,
      "humidity": 77,
      "dew_point": 49.14,
      "uvi": 0.21,
      "clouds": 75,
      "visibility": 10000,
      "wind_speed": 6.91,
      "wind_deg": 210,
      "weather": [
        {
          "id": 501,
          "main": "Rain",
          "description": "moderate rain",
          "icon": "10d"
        }
      ],
    },
    "daily": [
      {
        "dt": 1675540800,
        "sunrise": 1675523268,
        "sunset": 1675560554,
        "moonrise": 1675557120,
        "moonset": 1675522620,
        "moon_phase": 0.47,
        "temp": {
          "day": 56.66,
          "min": 43.38,
          "max": 57.96,
          "night": 51.64,
          "eve": 54.79,
          "morn": 43.88
        },
        "feels_like": {
          "day": 54.75,
          "night": 51.01,
          "eve": 53.78,
          "morn": 43.88
        },
        "pressure": 1020,
        "humidity": 58,
        "dew_point": 42.08,
        "wind_speed": 12.55,
        "wind_deg": 151,
        "wind_gust": 32.23,
        "weather": [
          {
            "id": 501,
            "main": "Rain",
            "description": "moderate rain",
            "icon": "10d"
          }
        ],
        "clouds": 95,
        "pop": 1,
        "rain": 9.32,
        "uvi": 2.51
      },
      {
        "dt": 1675627200,
        "sunrise": 1675609610,
        "sunset": 1675647024,
        "moonrise": 1675647180,
        "moonset": 1675611000,
        "moon_phase": 0.5,
        "temp": {
          "day": 51.22,
          "min": 42.62,
          "max": 51.22,
          "night": 42.62,
          "eve": 46.27,
          "morn": 45.7
        },
        "feels_like": {
          "day": 49.71,
          "night": 42.62,
          "eve": 46.27,
          "morn": 42.62
        },
        "pressure": 1022,
        "humidity": 78,
        "dew_point": 43.93,
        "wind_speed": 10.6,
        "wind_deg": 204,
        "wind_gust": 23.55,
        "weather": [
          {
            "id": 501,
            "main": "Rain",
            "description": "moderate rain",
            "icon": "10d"
          }
        ],
        "clouds": 89,
        "pop": 0.94,
        "rain": 10.95,
        "uvi": 1.69
      },
      {
        "dt": 1675713600,
        "sunrise": 1675695951,
        "sunset": 1675733493,
        "moonrise": 1675737240,
        "moonset": 1675699140,
        "moon_phase": 0.53,
        "temp": {
          "day": 51.44,
          "min": 37.15,
          "max": 55.81,
          "night": 41.74,
          "eve": 46.76,
          "morn": 37.63
        },
        "feels_like": {
          "day": 49.15,
          "night": 40.21,
          "eve": 44.38,
          "morn": 34.11
        },
        "pressure": 1028,
        "humidity": 61,
        "dew_point": 37.81,
        "wind_speed": 9.46,
        "wind_deg": 326,
        "wind_gust": 16.98,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
          }
        ],
        "clouds": 4,
        "pop": 0,
        "uvi": 2.83
      },
      {
        "dt": 1675800000,
        "sunrise": 1675782290,
        "sunset": 1675819963,
        "moonrise": 1675827300,
        "moonset": 1675786980,
        "moon_phase": 0.56,
        "temp": {
          "day": 53.65,
          "min": 39.27,
          "max": 55.31,
          "night": 44.22,
          "eve": 46.2,
          "morn": 39.27
        },
        "feels_like": {
          "day": 51.55,
          "night": 43.03,
          "eve": 45.14,
          "morn": 39.27
        },
        "pressure": 1029,
        "humidity": 60,
        "dew_point": 39.87,
        "wind_speed": 3.96,
        "wind_deg": 111,
        "wind_gust": 5.19,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "clouds": 100,
        "pop": 0,
        "uvi": 2.61
      },
      {
        "dt": 1675886400,
        "sunrise": 1675868628,
        "sunset": 1675906432,
        "moonrise": 1675917240,
        "moonset": 1675874760,
        "moon_phase": 0.59,
        "temp": {
          "day": 58.64,
          "min": 40.89,
          "max": 58.64,
          "night": 45.84,
          "eve": 48.13,
          "morn": 40.89
        },
        "feels_like": {
          "day": 56.79,
          "night": 45.84,
          "eve": 46.78,
          "morn": 40.89
        },
        "pressure": 1027,
        "humidity": 55,
        "dew_point": 41.95,
        "wind_speed": 6.8,
        "wind_deg": 321,
        "wind_gust": 12.53,
        "weather": [
          {
            "id": 801,
            "main": "Clouds",
            "description": "few clouds",
            "icon": "02d"
          }
        ],
        "clouds": 14,
        "pop": 0,
        "uvi": 3
      },
      {
        "dt": 1675972800,
        "sunrise": 1675954964,
        "sunset": 1675992901,
        "moonrise": 1676007300,
        "moonset": 1675962480,
        "moon_phase": 0.62,
        "temp": {
          "day": 59.83,
          "min": 41.2,
          "max": 60.04,
          "night": 48.58,
          "eve": 50.56,
          "morn": 41.2
        },
        "feels_like": {
          "day": 57.87,
          "night": 47.39,
          "eve": 48.79,
          "morn": 41.2
        },
        "pressure": 1024,
        "humidity": 50,
        "dew_point": 40.69,
        "wind_speed": 3.78,
        "wind_deg": 68,
        "wind_gust": 3.42,
        "weather": [
          {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
          }
        ],
        "clouds": 0,
        "pop": 0,
        "uvi": 3
      },
      {
        "dt": 1676059200,
        "sunrise": 1676041299,
        "sunset": 1676079370,
        "moonrise": 1676097360,
        "moonset": 1676050260,
        "moon_phase": 0.66,
        "temp": {
          "day": 60.22,
          "min": 46.24,
          "max": 60.22,
          "night": 50.38,
          "eve": 50.94,
          "morn": 46.24
        },
        "feels_like": {
          "day": 58.48,
          "night": 49.01,
          "eve": 49.53,
          "morn": 46.24
        },
        "pressure": 1021,
        "humidity": 54,
        "dew_point": 43.21,
        "wind_speed": 3.11,
        "wind_deg": 40,
        "wind_gust": 3.33,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ],
        "clouds": 100,
        "pop": 0,
        "uvi": 3
      },
      {
        "dt": 1676145600,
        "sunrise": 1676127633,
        "sunset": 1676165839,
        "moonrise": 1676187660,
        "moonset": 1676138040,
        "moon_phase": 0.69,
        "temp": {
          "day": 63.59,
          "min": 47.35,
          "max": 63.59,
          "night": 51.67,
          "eve": 53.92,
          "morn": 47.35
        },
        "feels_like": {
          "day": 62.13,
          "night": 50.45,
          "eve": 52.74,
          "morn": 47.35
        },
        "pressure": 1015,
        "humidity": 53,
        "dew_point": 45.75,
        "wind_speed": 3.24,
        "wind_deg": 343,
        "wind_gust": 4.65,
        "weather": [
          {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04d"
          }
        ],
        "clouds": 81,
        "pop": 0,
        "uvi": 3
      }
    ]
  }
;
