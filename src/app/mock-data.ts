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