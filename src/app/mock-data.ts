import { LocationT } from './location';
import { Forecast } from './forecast';
import { Jeocode, OneCallResponse } from './funTypes';

export const GEOCODESFORNONPROD: Jeocode [] =[
  {"zip":"94945","name":"Novato","lat":38.1163,"lon":-122.5714,"country":"US"},
  {"zip":"93727","name":"Fresno","lat":36.7528,"lon":-119.7061,"country":"US"},
  {"zip":"95757","name":"Elk Grove","lat":38.4081,"lon":-121.4294,"country":"US"},
  {"zip":"98382","name":"Sequim","lat":48.0881,"lon":-123.1198,"country":"US"},
  {"zip":"90810","name":"Carson","lat":33.8193,"lon":-118.2325,"country":"US"}

];

export const ONECALLRESPONSES: OneCallResponse[] = [
  {
  "lat": 33.8193,
  "lon": -118.2325,
  "timezone": "America/Los_Angeles",
  "timezone_offset": -25200,
  "data": [
    {
      "dt": 1792540800,
      "sunrise": 1792591355,
      "sunset": 1792631529,
      "moonrise": 1792534560,
      "moonset": 1792484520,
      "moon_phase": 0.32,
      "temp": {
        "day": 70.43,
        "min": 66.96,
        "max": 70.7,
        "night": 69.28,
        "eve": 67.6,
        "morn": 67.53
      },
      "feels_like": {
        "day": 70.43,
        "night": 69.28,
        "eve": 67.6,
        "morn": 67.53
      },
      "pressure": 1011.99,
      "humidity": 67,
      "dew_point": 59.23,
      "wind_speed": 10.98,
      "wind_deg": 146,
      "weather": [
        {
          "id": 501,
          "main": "Rain",
          "description": "moderate rain",
          "icon": "10d"
        }
      ],
      "clouds": 98,
      "pop": 1,
      "rain": 13.91,
      "uvi": 4.14
    },
    {
      "dt": 1792627200,
      "sunrise": 1792677806,
      "sunset": 1792717861,
      "moonrise": 1792622640,
      "moonset": 1792574520,
      "moon_phase": 0.35,
      "temp": {
        "day": 69.62,
        "min": 65.55,
        "max": 70.02,
        "night": 68.14,
        "eve": 67.84,
        "morn": 65.86
      },
      "feels_like": {
        "day": 69.62,
        "night": 68.14,
        "eve": 67.84,
        "morn": 65.86
      },
      "pressure": 1013.99,
      "humidity": 53,
      "dew_point": 52.2,
      "wind_speed": 11.88,
      "wind_deg": 249,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "clouds": 4,
      "pop": 0.69,
      "rain": 4.18,
      "uvi": 4.58
    },
    {
      "dt": 1792713600,
      "sunrise": 1792764256,
      "sunset": 1792804194,
      "moonrise": 1792710600,
      "moonset": 1792664580,
      "moon_phase": 0.38,
      "temp": {
        "day": 68.92,
        "min": 65.25,
        "max": 70.7,
        "night": 66.63,
        "eve": 68.9,
        "morn": 65.61
      },
      "feels_like": {
        "day": 68.92,
        "night": 66.63,
        "eve": 68.9,
        "morn": 65.61
      },
      "pressure": 1014.87,
      "humidity": 53,
      "dew_point": 51.39,
      "wind_speed": 8.66,
      "wind_deg": 284,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "clouds": 13,
      "pop": 0.32,
      "rain": 0.44,
      "uvi": 4.83
    },
    {
      "dt": 1792800000,
      "sunrise": 1792850707,
      "sunset": 1792890528,
      "moonrise": 1792798680,
      "moonset": 1792754640,
      "moon_phase": 0.41,
      "temp": {
        "day": 73.02,
        "min": 66.72,
        "max": 75.15,
        "night": 68.18,
        "eve": 72.32,
        "morn": 66.96
      },
      "feels_like": {
        "day": 73.02,
        "night": 68.18,
        "eve": 72.32,
        "morn": 66.96
      },
      "pressure": 1015.59,
      "humidity": 46,
      "dew_point": 51.13,
      "wind_speed": 10.85,
      "wind_deg": 268,
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
      "uvi": 5.32
    },
    {
      "dt": 1792886400,
      "sunrise": 1792937159,
      "sunset": 1792976863,
      "moonrise": 1792886820,
      "moonset": 1792844880,
      "moon_phase": 0.45,
      "temp": {
        "day": 78.19,
        "min": 70.54,
        "max": 81.21,
        "night": 71.31,
        "eve": 77.5,
        "morn": 70.72
      },
      "feels_like": {
        "day": 78.19,
        "night": 71.31,
        "eve": 77.5,
        "morn": 70.72
      },
      "pressure": 1016.1,
      "humidity": 31,
      "dew_point": 45.3,
      "wind_speed": 10.58,
      "wind_deg": 249,
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
      "uvi": 0
    },
    {
      "dt": 1792972800,
      "sunrise": 1793023611,
      "sunset": 1793063200,
      "moonrise": 1792975200,
      "moonset": 1792935300,
      "moon_phase": 0.5,
      "temp": {
        "day": 81.01,
        "min": 73.26,
        "max": 84.07,
        "night": 74.08,
        "eve": 78.78,
        "morn": 73.42
      },
      "feels_like": {
        "day": 81.01,
        "night": 74.08,
        "eve": 78.78,
        "morn": 73.42
      },
      "pressure": 1016.42,
      "humidity": 24,
      "dew_point": 41.38,
      "wind_speed": 11.12,
      "wind_deg": 267,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "clouds": 0,
      "pop": 0
    },
    {
      "dt": 1793059200,
      "sunrise": 1793110063,
      "sunset": 1793149537,
      "moonrise": 1793063820,
      "moonset": 1793025960,
      "moon_phase": 0.52,
      "temp": {
        "day": 81.7,
        "min": 74.68,
        "max": 84.47,
        "night": 75.47,
        "eve": 79.72,
        "morn": 74.82
      },
      "feels_like": {
        "day": 81.7,
        "night": 75.47,
        "eve": 79.72,
        "morn": 74.82
      },
      "pressure": 1014.01,
      "humidity": 21,
      "dew_point": 38.86,
      "wind_speed": 8.99,
      "wind_deg": 266,
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03d"
        }
      ],
      "clouds": 49,
      "pop": 0
    },
    {
      "dt": 1793145600,
      "sunrise": 1793196516,
      "sunset": 1793235876,
      "moonrise": 1793153040,
      "moonset": 1793116800,
      "moon_phase": 0.56,
      "temp": {
        "day": 82.35,
        "min": 76.01,
        "max": 84.96,
        "night": 76.66,
        "eve": 81.57,
        "morn": 76.17
      },
      "feels_like": {
        "day": 82.35,
        "night": 76.66,
        "eve": 81.57,
        "morn": 76.17
      },
      "pressure": 1011.22,
      "humidity": 23,
      "dew_point": 41.22,
      "wind_speed": 8.39,
      "wind_deg": 289,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": 100,
      "pop": 0
    },
    {
      "dt": 1793232000,
      "sunrise": 1793282969,
      "sunset": 1793322215,
      "moonrise": 1793242740,
      "moonset": 1793207580,
      "moon_phase": 0.6,
      "temp": {
        "day": 80.19,
        "min": 73.9,
        "max": 81.73,
        "night": 76.75,
        "eve": 77.86,
        "morn": 74.84
      },
      "feels_like": {
        "day": 80.19,
        "night": 76.75,
        "eve": 77.86,
        "morn": 74.84
      },
      "pressure": 1011.12,
      "humidity": 28,
      "dew_point": 44.19,
      "wind_speed": 8.01,
      "wind_deg": 259,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": 100,
      "pop": 0
    },
    {
      "dt": 1793318400,
      "sunrise": 1793369423,
      "sunset": 1793408556,
      "moonrise": 1793332980,
      "moonset": 1793298060,
      "moon_phase": 0.64,
      "temp": {
        "day": 73.33,
        "min": 69.85,
        "max": 74.55,
        "night": 73.2,
        "eve": 72.66,
        "morn": 70.61
      },
      "feels_like": {
        "day": 73.33,
        "night": 73.2,
        "eve": 72.66,
        "morn": 70.61
      },
      "pressure": 1011.29,
      "humidity": 59,
      "dew_point": 58.23,
      "wind_speed": 9.31,
      "wind_deg": 212,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": 69,
      "pop": 0
    }
  ],
  "prev": "http://api.openweathermap.org/data/4.0/onecall/timeline/1day?cnt=10&lat=33.8193&lon=-118.2325&start=1791676800&appid=7bba6087ba8a1265ba39fb831ec12cde&units=imperial",
  "next": "http://api.openweathermap.org/data/4.0/onecall/timeline/1day?cnt=10&lat=33.8193&lon=-118.2325&start=1793404800&appid=7bba6087ba8a1265ba39fb831ec12cde&units=imperial"
},
  {
  "lat": 48.0881,
  "lon": -123.1198,
  "timezone": "America/Los_Angeles",
  "timezone_offset": -25200,
  "data": [
    {
      "dt": 1792540800,
      "sunrise": 1792593646,
      "sunset": 1792631584,
      "moonrise": 1792537380,
      "moonset": 1792483680,
      "moon_phase": 0.32,
      "temp": {
        "day": 60.46,
        "min": 51.8,
        "max": 60.91,
        "night": 53.55,
        "eve": 54.16,
        "morn": 52.74
      },
      "feels_like": {
        "day": 60.46,
        "night": 53.55,
        "eve": 54.16,
        "morn": 52.74
      },
      "pressure": 1013.21,
      "humidity": 55,
      "dew_point": 44.47,
      "wind_speed": 6.2,
      "wind_deg": 245,
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03d"
        }
      ],
      "clouds": 45,
      "pop": 0,
      "uvi": 1.87
    },
    {
      "dt": 1792627200,
      "sunrise": 1792680137,
      "sunset": 1792717876,
      "moonrise": 1792624800,
      "moonset": 1792574340,
      "moon_phase": 0.35,
      "temp": {
        "day": 55.26,
        "min": 48.74,
        "max": 55.74,
        "night": 52.61,
        "eve": 52,
        "morn": 51.84
      },
      "feels_like": {
        "day": 55.26,
        "night": 52.61,
        "eve": 52,
        "morn": 51.84
      },
      "pressure": 1013.94,
      "humidity": 69,
      "dew_point": 45.59,
      "wind_speed": 6.15,
      "wind_deg": 267,
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
      "rain": 0.16,
      "uvi": 1.56
    },
    {
      "dt": 1792713600,
      "sunrise": 1792766628,
      "sunset": 1792804168,
      "moonrise": 1792712160,
      "moonset": 1792665060,
      "moon_phase": 0.38,
      "temp": {
        "day": 52.52,
        "min": 45.52,
        "max": 53.71,
        "night": 47.98,
        "eve": 48.58,
        "morn": 45.93
      },
      "feels_like": {
        "day": 52.52,
        "night": 47.98,
        "eve": 48.58,
        "morn": 45.93
      },
      "pressure": 1025.51,
      "humidity": 66,
      "dew_point": 41.58,
      "wind_speed": 5.79,
      "wind_deg": 15,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "clouds": 8,
      "pop": 0,
      "rain": 0.02,
      "uvi": 1.92
    },
    {
      "dt": 1792800000,
      "sunrise": 1792853120,
      "sunset": 1792890462,
      "moonrise": 1792799460,
      "moonset": 1792755900,
      "moon_phase": 0.41,
      "temp": {
        "day": 51.93,
        "min": 45.91,
        "max": 52.97,
        "night": 47.07,
        "eve": 48.97,
        "morn": 46.2
      },
      "feels_like": {
        "day": 51.93,
        "night": 47.07,
        "eve": 48.97,
        "morn": 46.2
      },
      "pressure": 1026.54,
      "humidity": 66,
      "dew_point": 41.29,
      "wind_speed": 4.94,
      "wind_deg": 0,
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
      "uvi": 1.86
    },
    {
      "dt": 1792886400,
      "sunrise": 1792939611,
      "sunset": 1792976757,
      "moonrise": 1792886940,
      "moonset": 1792846860,
      "moon_phase": 0.45,
      "temp": {
        "day": 55.2,
        "min": 48.18,
        "max": 57.83,
        "night": 48.49,
        "eve": 54.19,
        "morn": 48.49
      },
      "feels_like": {
        "day": 55.2,
        "night": 48.49,
        "eve": 54.19,
        "morn": 48.49
      },
      "pressure": 1024.45,
      "humidity": 56,
      "dew_point": 40.1,
      "wind_speed": 4.45,
      "wind_deg": 353,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": 68,
      "pop": 0,
      "uvi": 0
    },
    {
      "dt": 1792972800,
      "sunrise": 1793026103,
      "sunset": 1793063053,
      "moonrise": 1792974540,
      "moonset": 1792938120,
      "moon_phase": 0.5,
      "temp": {
        "day": 57.31,
        "min": 51.4,
        "max": 58.68,
        "night": 52.66,
        "eve": 55.26,
        "morn": 51.75
      },
      "feels_like": {
        "day": 57.31,
        "night": 52.66,
        "eve": 55.26,
        "morn": 51.75
      },
      "pressure": 1025.97,
      "humidity": 54,
      "dew_point": 40.87,
      "wind_speed": 3.71,
      "wind_deg": 267,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": 100,
      "pop": 0
    },
    {
      "dt": 1793059200,
      "sunrise": 1793112596,
      "sunset": 1793149350,
      "moonrise": 1793062500,
      "moonset": 1793029560,
      "moon_phase": 0.52,
      "temp": {
        "day": 56.39,
        "min": 49.91,
        "max": 57.45,
        "night": 52.65,
        "eve": 54.39,
        "morn": 50.61
      },
      "feels_like": {
        "day": 56.39,
        "night": 52.65,
        "eve": 54.39,
        "morn": 50.61
      },
      "pressure": 1023.11,
      "humidity": 67,
      "dew_point": 45.72,
      "wind_speed": 4.5,
      "wind_deg": 4,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04d"
        }
      ],
      "clouds": 47,
      "pop": 0
    },
    {
      "dt": 1793145600,
      "sunrise": 1793199088,
      "sunset": 1793235649,
      "moonrise": 1793150940,
      "moonset": 1793121120,
      "moon_phase": 0.56,
      "temp": {
        "day": 58.14,
        "min": 50.45,
        "max": 59.76,
        "night": 52.56,
        "eve": 56.07,
        "morn": 50.9
      },
      "feels_like": {
        "day": 58.14,
        "night": 52.56,
        "eve": 56.07,
        "morn": 50.9
      },
      "pressure": 1020.38,
      "humidity": 55,
      "dew_point": 42.48,
      "wind_speed": 4.21,
      "wind_deg": 2,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "clouds": 0,
      "pop": 0
    },
    {
      "dt": 1793232000,
      "sunrise": 1793285581,
      "sunset": 1793321949,
      "moonrise": 1793240220,
      "moonset": 1793212440,
      "moon_phase": 0.6,
      "temp": {
        "day": 58.6,
        "min": 50.85,
        "max": 59.67,
        "night": 52.86,
        "eve": 55.33,
        "morn": 51.3
      },
      "feels_like": {
        "day": 58.6,
        "night": 52.86,
        "eve": 55.33,
        "morn": 51.3
      },
      "pressure": 1015.22,
      "humidity": 47,
      "dew_point": 38.61,
      "wind_speed": 3.74,
      "wind_deg": 217,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "clouds": 7,
      "pop": 0
    },
    {
      "dt": 1793318400,
      "sunrise": 1793372074,
      "sunset": 1793408251,
      "moonrise": 1793330400,
      "moonset": 1793303100,
      "moon_phase": 0.64,
      "temp": {
        "day": 52.5,
        "min": 46.98,
        "max": 53.38,
        "night": 51.89,
        "eve": 49.86,
        "morn": 48.97
      },
      "feels_like": {
        "day": 52.5,
        "night": 51.89,
        "eve": 49.86,
        "morn": 48.97
      },
      "pressure": 1012.48,
      "humidity": 63,
      "dew_point": 40.44,
      "wind_speed": 5.32,
      "wind_deg": 20,
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03d"
        }
      ],
      "clouds": 57,
      "pop": 0
    }
  ],
  "prev": "http://api.openweathermap.org/data/4.0/onecall/timeline/1day?cnt=10&lat=48.0881&lon=-123.1198&start=1791676800&appid=7bba6087ba8a1265ba39fb831ec12cde&units=imperial",
  "next": "http://api.openweathermap.org/data/4.0/onecall/timeline/1day?cnt=10&lat=48.0881&lon=-123.1198&start=1793404800&appid=7bba6087ba8a1265ba39fb831ec12cde&units=imperial"
},
{
  "lat": 38.4081,
  "lon": -121.4294,
  "timezone": "America/Los_Angeles",
  "timezone_offset": -25200,
  "data": [
    {
      "dt": 1792540800,
      "sunrise": 1792592433,
      "sunset": 1792631986,
      "moonrise": 1792535820,
      "moonset": 1792484760,
      "moon_phase": 0.32,
      "temp": {
        "day": 65.52,
        "min": 58.06,
        "max": 70.45,
        "night": 60.28,
        "eve": 64.04,
        "morn": 58.17
      },
      "feels_like": {
        "day": 65.52,
        "night": 60.28,
        "eve": 64.04,
        "morn": 58.17
      },
      "pressure": 1011.37,
      "humidity": 65,
      "dew_point": 53.76,
      "wind_speed": 8.63,
      "wind_deg": 159,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "clouds": 100,
      "pop": 0.43,
      "rain": 2.28,
      "uvi": 2.14
    },
    {
      "dt": 1792627200,
      "sunrise": 1792678894,
      "sunset": 1792718307,
      "moonrise": 1792623660,
      "moonset": 1792574940,
      "moon_phase": 0.35,
      "temp": {
        "day": 60.39,
        "min": 57.04,
        "max": 65.19,
        "night": 60.39,
        "eve": 61.56,
        "morn": 57.18
      },
      "feels_like": {
        "day": 60.39,
        "night": 60.39,
        "eve": 61.56,
        "morn": 57.18
      },
      "pressure": 1013.26,
      "humidity": 83,
      "dew_point": 55.22,
      "wind_speed": 6.31,
      "wind_deg": 175,
      "weather": [
        {
          "id": 501,
          "main": "Rain",
          "description": "moderate rain",
          "icon": "10d"
        }
      ],
      "clouds": 100,
      "pop": 0.8,
      "rain": 7.92,
      "uvi": 2.59
    },
    {
      "dt": 1792713600,
      "sunrise": 1792765356,
      "sunset": 1792804629,
      "moonrise": 1792711500,
      "moonset": 1792665180,
      "moon_phase": 0.38,
      "temp": {
        "day": 67.84,
        "min": 54.21,
        "max": 72.59,
        "night": 59.18,
        "eve": 67.89,
        "morn": 54.75
      },
      "feels_like": {
        "day": 67.84,
        "night": 59.18,
        "eve": 67.89,
        "morn": 54.75
      },
      "pressure": 1017.25,
      "humidity": 58,
      "dew_point": 52.57,
      "wind_speed": 10.49,
      "wind_deg": 334,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "clouds": 8,
      "pop": 0.01,
      "uvi": 3.89
    },
    {
      "dt": 1792800000,
      "sunrise": 1792851818,
      "sunset": 1792890952,
      "moonrise": 1792799340,
      "moonset": 1792755420,
      "moon_phase": 0.41,
      "temp": {
        "day": 67.23,
        "min": 50.61,
        "max": 73.72,
        "night": 57.11,
        "eve": 67.44,
        "morn": 51.1
      },
      "feels_like": {
        "day": 67.23,
        "night": 57.11,
        "eve": 67.44,
        "morn": 51.1
      },
      "pressure": 1018.43,
      "humidity": 30,
      "dew_point": 35.4,
      "wind_speed": 6.44,
      "wind_deg": 302,
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
      "uvi": 4.17
    },
    {
      "dt": 1792886400,
      "sunrise": 1792938280,
      "sunset": 1792977276,
      "moonrise": 1792887300,
      "moonset": 1792845900,
      "moon_phase": 0.45,
      "temp": {
        "day": 70.18,
        "min": 54.19,
        "max": 75.45,
        "night": 58.96,
        "eve": 72.05,
        "morn": 54.88
      },
      "feels_like": {
        "day": 70.18,
        "night": 58.96,
        "eve": 72.05,
        "morn": 54.88
      },
      "pressure": 1019.39,
      "humidity": 28,
      "dew_point": 36.09,
      "wind_speed": 5.97,
      "wind_deg": 337,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "clouds": 2,
      "pop": 0,
      "uvi": 0
    },
    {
      "dt": 1792972800,
      "sunrise": 1793024743,
      "sunset": 1793063602,
      "moonrise": 1792975440,
      "moonset": 1792936560,
      "moon_phase": 0.5,
      "temp": {
        "day": 71.78,
        "min": 55.67,
        "max": 77.41,
        "night": 60.67,
        "eve": 73.76,
        "morn": 56.08
      },
      "feels_like": {
        "day": 71.78,
        "night": 60.67,
        "eve": 73.76,
        "morn": 56.08
      },
      "pressure": 1020.01,
      "humidity": 27,
      "dew_point": 36.16,
      "wind_speed": 4.99,
      "wind_deg": 336,
      "weather": [
        {
          "id": 801,
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02d"
        }
      ],
      "clouds": 7,
      "pop": 0
    },
    {
      "dt": 1793059200,
      "sunrise": 1793111206,
      "sunset": 1793149928,
      "moonrise": 1793063940,
      "moonset": 1793027400,
      "moon_phase": 0.52,
      "temp": {
        "day": 73.13,
        "min": 57.15,
        "max": 78.8,
        "night": 62.06,
        "eve": 75.07,
        "morn": 57.4
      },
      "feels_like": {
        "day": 73.13,
        "night": 62.06,
        "eve": 75.07,
        "morn": 57.4
      },
      "pressure": 1016.82,
      "humidity": 27,
      "dew_point": 37.27,
      "wind_speed": 5.17,
      "wind_deg": 329,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04d"
        }
      ],
      "clouds": 59,
      "pop": 0
    },
    {
      "dt": 1793145600,
      "sunrise": 1793197670,
      "sunset": 1793236256,
      "moonrise": 1793152920,
      "moonset": 1793118420,
      "moon_phase": 0.56,
      "temp": {
        "day": 71.83,
        "min": 58.66,
        "max": 76.62,
        "night": 63.39,
        "eve": 72.77,
        "morn": 59.27
      },
      "feels_like": {
        "day": 71.83,
        "night": 63.39,
        "eve": 72.77,
        "morn": 59.27
      },
      "pressure": 1013.74,
      "humidity": 29,
      "dew_point": 37.94,
      "wind_speed": 4.68,
      "wind_deg": 341,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": 99,
      "pop": 0
    },
    {
      "dt": 1793232000,
      "sunrise": 1793284134,
      "sunset": 1793322585,
      "moonrise": 1793242560,
      "moonset": 1793209320,
      "moon_phase": 0.6,
      "temp": {
        "day": 71.67,
        "min": 58.71,
        "max": 76.23,
        "night": 64.13,
        "eve": 72.73,
        "morn": 59.13
      },
      "feels_like": {
        "day": 71.67,
        "night": 64.13,
        "eve": 72.73,
        "morn": 59.13
      },
      "pressure": 1012.9,
      "humidity": 29,
      "dew_point": 38.21,
      "wind_speed": 4.79,
      "wind_deg": 334,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": 100,
      "pop": 0
    },
    {
      "dt": 1793318400,
      "sunrise": 1793370598,
      "sunset": 1793408916,
      "moonrise": 1793332800,
      "moonset": 1793299860,
      "moon_phase": 0.64,
      "temp": {
        "day": 70.29,
        "min": 55.96,
        "max": 74.43,
        "night": 62.19,
        "eve": 69.06,
        "morn": 57.97
      },
      "feels_like": {
        "day": 70.29,
        "night": 62.19,
        "eve": 69.06,
        "morn": 57.97
      },
      "pressure": 1012.15,
      "humidity": 30,
      "dew_point": 38.08,
      "wind_speed": 6.73,
      "wind_deg": 238,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": 96,
      "pop": 0
    }
  ],
  "prev": "http://api.openweathermap.org/data/4.0/onecall/timeline/1day?cnt=10&lat=38.4081&lon=-121.4294&start=1791676800&appid=7bba6087ba8a1265ba39fb831ec12cde&units=imperial",
  "next": "http://api.openweathermap.org/data/4.0/onecall/timeline/1day?cnt=10&lat=38.4081&lon=-121.4294&start=1793404800&appid=7bba6087ba8a1265ba39fb831ec12cde&units=imperial"
},  
{
  "lat": 38.1163,
  "lon": -122.5714,
  "timezone": "America/Los_Angeles",
  "timezone_offset": -25200,
  "data": [
    {
      "dt": 1792454400,
      "sunrise": 1792506226,
      "sunset": 1792545960,
      "moonrise": 1792448040,
      "moonset": 1792394940,
      "moon_phase": 0.28,
      "temp": {
        "day": 64.33,
        "min": 50.67,
        "max": 67.48,
        "night": 51.51,
        "eve": 62.64,
        "morn": 51.4
      },
      "feels_like": {
        "day": 64.33,
        "night": 51.51,
        "eve": 62.64,
        "morn": 51.4
      },
      "pressure": 1012.36,
      "humidity": 44,
      "dew_point": 41.99,
      "wind_speed": 4.38,
      "wind_deg": 282,
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
      "rain": 0.1,
      "uvi": 3.18
    },
    {
      "dt": 1792540800,
      "sunrise": 1792592686,
      "sunset": 1792632281,
      "moonrise": 1792536060,
      "moonset": 1792485060,
      "moon_phase": 0.32,
      "temp": {
        "day": 64.2,
        "min": 56.1,
        "max": 68.25,
        "night": 57.06,
        "eve": 64.92,
        "morn": 56.84
      },
      "feels_like": {
        "day": 64.2,
        "night": 57.06,
        "eve": 64.92,
        "morn": 56.84
      },
      "pressure": 1013.32,
      "humidity": 57,
      "dew_point": 48.79,
      "wind_speed": 5.84,
      "wind_deg": 307,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": 100,
      "pop": 0.29,
      "rain": 0.31,
      "uvi": 2.83
    },
    {
      "dt": 1792627200,
      "sunrise": 1792679147,
      "sunset": 1792718603,
      "moonrise": 1792623960,
      "moonset": 1792575240,
      "moon_phase": 0.35,
      "temp": {
        "day": 58.28,
        "min": 53.13,
        "max": 61.23,
        "night": 57.18,
        "eve": 59.56,
        "morn": 57.87
      },
      "feels_like": {
        "day": 58.28,
        "night": 57.18,
        "eve": 59.56,
        "morn": 57.87
      },
      "pressure": 1014.86,
      "humidity": 87,
      "dew_point": 54.59,
      "wind_speed": 5.23,
      "wind_deg": 230,
      "weather": [
        {
          "id": 501,
          "main": "Rain",
          "description": "moderate rain",
          "icon": "10d"
        }
      ],
      "clouds": 100,
      "pop": 0.66,
      "rain": 8.62,
      "uvi": 1.77
    },
    {
      "dt": 1792713600,
      "sunrise": 1792765608,
      "sunset": 1792804925,
      "moonrise": 1792711740,
      "moonset": 1792665480,
      "moon_phase": 0.38,
      "temp": {
        "day": 66.07,
        "min": 51.48,
        "max": 69.75,
        "night": 52.88,
        "eve": 62.42,
        "morn": 51.49
      },
      "feels_like": {
        "day": 66.07,
        "night": 52.88,
        "eve": 62.42,
        "morn": 51.49
      },
      "pressure": 1020.27,
      "humidity": 59,
      "dew_point": 51.42,
      "wind_speed": 6.11,
      "wind_deg": 244,
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
      "uvi": 3.96
    },
    {
      "dt": 1792800000,
      "sunrise": 1792852069,
      "sunset": 1792891249,
      "moonrise": 1792799640,
      "moonset": 1792755720,
      "moon_phase": 0.41,
      "temp": {
        "day": 68.76,
        "min": 54.32,
        "max": 73.13,
        "night": 55.13,
        "eve": 68.88,
        "morn": 54.54
      },
      "feels_like": {
        "day": 68.76,
        "night": 55.13,
        "eve": 68.88,
        "morn": 54.54
      },
      "pressure": 1019.78,
      "humidity": 40,
      "dew_point": 43.86,
      "wind_speed": 4.41,
      "wind_deg": 344,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "clouds": 6,
      "pop": 0,
      "uvi": 0
    },
    {
      "dt": 1792886400,
      "sunrise": 1792938531,
      "sunset": 1792977574,
      "moonrise": 1792887600,
      "moonset": 1792846200,
      "moon_phase": 0.45,
      "temp": {
        "day": 69.49,
        "min": 56.37,
        "max": 73.54,
        "night": 59.5,
        "eve": 68.47,
        "morn": 56.93
      },
      "feels_like": {
        "day": 69.49,
        "night": 59.5,
        "eve": 68.47,
        "morn": 56.93
      },
      "pressure": 1018.77,
      "humidity": 32,
      "dew_point": 38.62,
      "wind_speed": 4.05,
      "wind_deg": 236,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": 95,
      "pop": 0
    },
    {
      "dt": 1792972800,
      "sunrise": 1793024993,
      "sunset": 1793063900,
      "moonrise": 1792975800,
      "moonset": 1792936800,
      "moon_phase": 0.5,
      "temp": {
        "day": 71.73,
        "min": 59.52,
        "max": 75.15,
        "night": 62.28,
        "eve": 70.16,
        "morn": 60.03
      },
      "feels_like": {
        "day": 71.73,
        "night": 62.28,
        "eve": 70.16,
        "morn": 60.03
      },
      "pressure": 1015.97,
      "humidity": 32,
      "dew_point": 40.41,
      "wind_speed": 4.47,
      "wind_deg": 310,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": 97,
      "pop": 0
    },
    {
      "dt": 1793059200,
      "sunrise": 1793111455,
      "sunset": 1793150227,
      "moonrise": 1793064240,
      "moonset": 1793027640,
      "moon_phase": 0.52,
      "temp": {
        "day": 71.1,
        "min": 57.97,
        "max": 74.43,
        "night": 61.41,
        "eve": 69.26,
        "morn": 58.44
      },
      "feels_like": {
        "day": 71.1,
        "night": 61.41,
        "eve": 69.26,
        "morn": 58.44
      },
      "pressure": 1014.42,
      "humidity": 32,
      "dew_point": 39.94,
      "wind_speed": 4.05,
      "wind_deg": 303,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04d"
        }
      ],
      "clouds": 68,
      "pop": 0
    },
    {
      "dt": 1793145600,
      "sunrise": 1793197918,
      "sunset": 1793236556,
      "moonrise": 1793153280,
      "moonset": 1793118660,
      "moon_phase": 0.56,
      "temp": {
        "day": 70.09,
        "min": 55.24,
        "max": 72,
        "night": 59.52,
        "eve": 64.51,
        "morn": 58.75
      },
      "feels_like": {
        "day": 70.09,
        "night": 59.52,
        "eve": 64.51,
        "morn": 58.75
      },
      "pressure": 1014.03,
      "humidity": 35,
      "dew_point": 41.29,
      "wind_speed": 5.73,
      "wind_deg": 238,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04d"
        }
      ],
      "clouds": 49,
      "pop": 0
    },
    {
      "dt": 1793232000,
      "sunrise": 1793284381,
      "sunset": 1793322886,
      "moonrise": 1793242920,
      "moonset": 1793209560,
      "moon_phase": 0.6,
      "temp": {
        "day": 65.39,
        "min": 52.75,
        "max": 67.59,
        "night": 54.88,
        "eve": 60.78,
        "morn": 52.86
      },
      "feels_like": {
        "day": 65.39,
        "night": 54.88,
        "eve": 60.78,
        "morn": 52.86
      },
      "pressure": 1012.46,
      "humidity": 46,
      "dew_point": 44.44,
      "wind_speed": 5.93,
      "wind_deg": 188,
      "weather": [
        {
          "id": 801,
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02d"
        }
      ],
      "clouds": 44,
      "pop": 0
    }
  ],
  "prev": "http://api.openweathermap.org/data/4.0/onecall/timeline/1day?cnt=10&lat=38.1163&lon=-122.5714&start=1791590400&appid=7bba6087ba8a1265ba39fb831ec12cde&units=imperial",
  "next": "http://api.openweathermap.org/data/4.0/onecall/timeline/1day?cnt=10&lat=38.1163&lon=-122.5714&start=1793318400&appid=7bba6087ba8a1265ba39fb831ec12cde&units=imperial"
},
{
  "lat": 36.7528,
  "lon": -119.7061,
  "timezone": "America/Los_Angeles",
  "timezone_offset": -25200,
  "data": [
    {
      "dt": 1792454400,
      "sunrise": 1792505446,
      "sunset": 1792545365,
      "moonrise": 1792447140,
      "moonset": 1792394400,
      "moon_phase": 0.28,
      "temp": {
        "day": 74.03,
        "min": 59.41,
        "max": 80.11,
        "night": 67.28,
        "eve": 77.72,
        "morn": 59.41
      },
      "feels_like": {
        "day": 74.03,
        "night": 67.28,
        "eve": 77.72,
        "morn": 59.41
      },
      "pressure": 1010.93,
      "humidity": 25,
      "dew_point": 36.68,
      "wind_speed": 9.55,
      "wind_deg": 322,
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03d"
        }
      ],
      "clouds": 37,
      "pop": 0.01,
      "rain": 0.05,
      "uvi": 4.58
    },
    {
      "dt": 1792540800,
      "sunrise": 1792591903,
      "sunset": 1792631689,
      "moonrise": 1792535220,
      "moonset": 1792484520,
      "moon_phase": 0.32,
      "temp": {
        "day": 70.54,
        "min": 61.09,
        "max": 72.03,
        "night": 65.86,
        "eve": 70.43,
        "morn": 63.07
      },
      "feels_like": {
        "day": 70.54,
        "night": 65.86,
        "eve": 70.43,
        "morn": 63.07
      },
      "pressure": 1011.49,
      "humidity": 36,
      "dew_point": 42.66,
      "wind_speed": 10.98,
      "wind_deg": 162,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": 100,
      "pop": 0.36,
      "rain": 0.24,
      "uvi": 2.09
    },
    {
      "dt": 1792627200,
      "sunrise": 1792678360,
      "sunset": 1792718014,
      "moonrise": 1792623180,
      "moonset": 1792574640,
      "moon_phase": 0.35,
      "temp": {
        "day": 63.12,
        "min": 57.83,
        "max": 67.39,
        "night": 61.68,
        "eve": 64.89,
        "morn": 59.32
      },
      "feels_like": {
        "day": 63.12,
        "night": 61.68,
        "eve": 64.89,
        "morn": 59.32
      },
      "pressure": 1014.43,
      "humidity": 71,
      "dew_point": 53.6,
      "wind_speed": 7.94,
      "wind_deg": 305,
      "weather": [
        {
          "id": 501,
          "main": "Rain",
          "description": "moderate rain",
          "icon": "10d"
        }
      ],
      "clouds": 99,
      "pop": 0.85,
      "rain": 6.48,
      "uvi": 3.27
    },
    {
      "dt": 1792713600,
      "sunrise": 1792764818,
      "sunset": 1792804340,
      "moonrise": 1792711020,
      "moonset": 1792664820,
      "moon_phase": 0.38,
      "temp": {
        "day": 66.78,
        "min": 58.19,
        "max": 72.57,
        "night": 61.81,
        "eve": 70.52,
        "morn": 59.83
      },
      "feels_like": {
        "day": 66.78,
        "night": 61.81,
        "eve": 70.52,
        "morn": 59.83
      },
      "pressure": 1018.87,
      "humidity": 55,
      "dew_point": 50.18,
      "wind_speed": 8.57,
      "wind_deg": 313,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "clouds": 5,
      "pop": 0,
      "uvi": 4.41
    },
    {
      "dt": 1792800000,
      "sunrise": 1792851276,
      "sunset": 1792890667,
      "moonrise": 1792798980,
      "moonset": 1792755000,
      "moon_phase": 0.41,
      "temp": {
        "day": 72.25,
        "min": 59.81,
        "max": 78.08,
        "night": 63.81,
        "eve": 76.15,
        "morn": 60.19
      },
      "feels_like": {
        "day": 72.25,
        "night": 63.81,
        "eve": 76.15,
        "morn": 60.19
      },
      "pressure": 1019.53,
      "humidity": 38,
      "dew_point": 45.46,
      "wind_speed": 4.61,
      "wind_deg": 61,
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
      "uvi": 0
    },
    {
      "dt": 1792886400,
      "sunrise": 1792937734,
      "sunset": 1792976995,
      "moonrise": 1792887000,
      "moonset": 1792845420,
      "moon_phase": 0.45,
      "temp": {
        "day": 75.29,
        "min": 62.6,
        "max": 80.73,
        "night": 67.17,
        "eve": 78.37,
        "morn": 63.25
      },
      "feels_like": {
        "day": 75.29,
        "night": 67.17,
        "eve": 78.37,
        "morn": 63.25
      },
      "pressure": 1018.1,
      "humidity": 23,
      "dew_point": 35.71,
      "wind_speed": 4.03,
      "wind_deg": 153,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04d"
        }
      ],
      "clouds": 48,
      "pop": 0
    },
    {
      "dt": 1792972800,
      "sunrise": 1793024193,
      "sunset": 1793063325,
      "moonrise": 1792975200,
      "moonset": 1792935960,
      "moon_phase": 0.5,
      "temp": {
        "day": 76.98,
        "min": 64.65,
        "max": 82.08,
        "night": 69.28,
        "eve": 79.61,
        "morn": 64.96
      },
      "feels_like": {
        "day": 76.98,
        "night": 69.28,
        "eve": 79.61,
        "morn": 64.96
      },
      "pressure": 1015.68,
      "humidity": 18,
      "dew_point": 31.66,
      "wind_speed": 4.56,
      "wind_deg": 265,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04d"
        }
      ],
      "clouds": 55,
      "pop": 0
    },
    {
      "dt": 1793059200,
      "sunrise": 1793110652,
      "sunset": 1793149656,
      "moonrise": 1793063760,
      "moonset": 1793026740,
      "moon_phase": 0.52,
      "temp": {
        "day": 75.94,
        "min": 64.44,
        "max": 81.18,
        "night": 69.15,
        "eve": 78.67,
        "morn": 64.89
      },
      "feels_like": {
        "day": 75.94,
        "night": 69.15,
        "eve": 78.67,
        "morn": 64.89
      },
      "pressure": 1014.07,
      "humidity": 15,
      "dew_point": 25.97,
      "wind_speed": 2.82,
      "wind_deg": 55,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": 99,
      "pop": 0
    },
    {
      "dt": 1793145600,
      "sunrise": 1793197112,
      "sunset": 1793235987,
      "moonrise": 1793152860,
      "moonset": 1793117640,
      "moon_phase": 0.56,
      "temp": {
        "day": 77.72,
        "min": 64.94,
        "max": 83.41,
        "night": 68.76,
        "eve": 80.98,
        "morn": 65.52
      },
      "feels_like": {
        "day": 77.72,
        "night": 68.76,
        "eve": 80.98,
        "morn": 65.52
      },
      "pressure": 1012.85,
      "humidity": 12,
      "dew_point": 23.88,
      "wind_speed": 4,
      "wind_deg": 333,
      "weather": [
        {
          "id": 801,
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02d"
        }
      ],
      "clouds": 11,
      "pop": 0
    },
    {
      "dt": 1793232000,
      "sunrise": 1793283571,
      "sunset": 1793322321,
      "moonrise": 1793242500,
      "moonset": 1793208540,
      "moon_phase": 0.6,
      "temp": {
        "day": 74.71,
        "min": 63.91,
        "max": 78.51,
        "night": 70.07,
        "eve": 76.64,
        "morn": 64.49
      },
      "feels_like": {
        "day": 74.71,
        "night": 70.07,
        "eve": 76.64,
        "morn": 64.49
      },
      "pressure": 1011.64,
      "humidity": 17,
      "dew_point": 28.36,
      "wind_speed": 4.56,
      "wind_deg": 306,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": 90,
      "pop": 0
    }
  ],
  "prev": "http://api.openweathermap.org/data/4.0/onecall/timeline/1day?cnt=10&lat=36.7528&lon=-119.7061&start=1791590400&appid=7bba6087ba8a1265ba39fb831ec12cde&units=imperial",
  "next": "http://api.openweathermap.org/data/4.0/onecall/timeline/1day?cnt=10&lat=36.7528&lon=-119.7061&start=1793318400&appid=7bba6087ba8a1265ba39fb831ec12cde&units=imperial"
}
];