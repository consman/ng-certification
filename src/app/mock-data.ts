import { Location } from './location';
import { Forecast } from './forecast';
export const RAWFORECASTS: Forecast[] = [
  {
    lat: 38.6709,
    lon: -121.1529,
    timezone: 'America/Los_Angeles',
    timezone_offset: -28800,
    current: {
      dt: 1675655292,
      sunrise: 1675609610,
      sunset: 1675647024,
      temp: 46.02,
      feels_like: 45.18,
      pressure: 1024,
      humidity: 85,
      dew_point: 41.77,
      uvi: 0,
      clouds: 67,
      visibility: 10000,
      wind_speed: 3,
      wind_deg: 105,
      wind_gust: 4,
      weather: [
        {
          id: 803,
          main: 'Clouds',
          description: 'broken clouds',
          icon: '04n'
        }
      ]
    },
    daily: [
      {
        dt: 1675627200,
        sunrise: 1675609610,
        sunset: 1675647024,
        moonrise: 1675647180,
        moonset: 1675611000,
        moon_phase: 0.5,
        temp: {
          day: 52.34,
          min: 44.28,
          max: 52.97,
          night: 44.28,
          eve: 46.08,
          morn: 45.55
        },
        feels_like: {
          day: 50.9,
          night: 44.28,
          eve: 46.08,
          morn: 42.22
        },
        pressure: 1022,
        humidity: 77,
        dew_point: 44.82,
        wind_speed: 10.11,
        wind_deg: 210,
        wind_gust: 22.41,
        weather: [
          {
            id: 501,
            main: 'Rain',
            description: 'moderate rain',
            icon: '10d'
          }
        ],
        clouds: 78,
        pop: 0.93,
        rain: 13.49,
        uvi: 1.75
      },
      {
        dt: 1675713600,
        sunrise: 1675695951,
        sunset: 1675733493,
        moonrise: 1675737240,
        moonset: 1675699140,
        moon_phase: 0.53,
        temp: {
          day: 51.66,
          min: 36.88,
          max: 55.62,
          night: 42.24,
          eve: 46.98,
          morn: 37.47
        },
        feels_like: {
          day: 49.33,
          night: 40.51,
          eve: 45.86,
          morn: 34.79
        },
        pressure: 1029,
        humidity: 60,
        dew_point: 37.78,
        wind_speed: 7.92,
        wind_deg: 306,
        wind_gust: 12.88,
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: 1,
        pop: 0,
        uvi: 2.86
      },
      {
        dt: 1675800000,
        sunrise: 1675782290,
        sunset: 1675819963,
        moonrise: 1675827300,
        moonset: 1675786980,
        moon_phase: 0.56,
        temp: {
          day: 52.38,
          min: 38.93,
          max: 55.96,
          night: 43.75,
          eve: 47.26,
          morn: 39.43
        },
        feels_like: {
          day: 50.27,
          night: 43.75,
          eve: 47.26,
          morn: 37.65
        },
        pressure: 1029,
        humidity: 63,
        dew_point: 39.63,
        wind_speed: 4.47,
        wind_deg: 115,
        wind_gust: 6.76,
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d'
          }
        ],
        clouds: 100,
        pop: 0,
        uvi: 2.11
      },
      {
        dt: 1675886400,
        sunrise: 1675868628,
        sunset: 1675906432,
        moonrise: 1675917240,
        moonset: 1675874760,
        moon_phase: 0.59,
        temp: {
          day: 57.81,
          min: 40.69,
          max: 57.81,
          night: 46.15,
          eve: 48.2,
          morn: 40.93
        },
        feels_like: {
          day: 55.98,
          night: 46.15,
          eve: 46.96,
          morn: 40.93
        },
        pressure: 1027,
        humidity: 57,
        dew_point: 42.35,
        wind_speed: 6.38,
        wind_deg: 320,
        wind_gust: 9.62,
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02d'
          }
        ],
        clouds: 13,
        pop: 0,
        uvi: 3.06
      },
      {
        dt: 1675972800,
        sunrise: 1675954964,
        sunset: 1675992901,
        moonrise: 1676007300,
        moonset: 1675962480,
        moon_phase: 0.62,
        temp: {
          day: 59.72,
          min: 42.06,
          max: 60.03,
          night: 47.88,
          eve: 50.47,
          morn: 42.06
        },
        feels_like: {
          day: 58.12,
          night: 46.49,
          eve: 49.15,
          morn: 42.06
        },
        pressure: 1025,
        humidity: 58,
        dew_point: 44.42,
        wind_speed: 3.91,
        wind_deg: 108,
        wind_gust: 4.7,
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d'
          }
        ],
        clouds: 92,
        pop: 0,
        uvi: 3.2
      },
      {
        dt: 1676059200,
        sunrise: 1676041299,
        sunset: 1676079370,
        moonrise: 1676097360,
        moonset: 1676050260,
        moon_phase: 0.66,
        temp: {
          day: 52.16,
          min: 41.58,
          max: 52.45,
          night: 41.58,
          eve: 44.38,
          morn: 42.98
        },
        feels_like: {
          day: 50.32,
          night: 41.58,
          eve: 44.38,
          morn: 40.3
        },
        pressure: 1023,
        humidity: 69,
        dew_point: 41.77,
        wind_speed: 7.47,
        wind_deg: 332,
        wind_gust: 15.57,
        weather: [
          {
            id: 500,
            main: 'Rain',
            description: 'light rain',
            icon: '10d'
          }
        ],
        clouds: 60,
        pop: 0.32,
        rain: 0.61,
        uvi: 4
      },
      {
        dt: 1676145600,
        sunrise: 1676127633,
        sunset: 1676165839,
        moonrise: 1676187660,
        moonset: 1676138040,
        moon_phase: 0.69,
        temp: {
          day: 53.64,
          min: 35.44,
          max: 53.64,
          night: 40.93,
          eve: 44.02,
          morn: 35.44
        },
        feels_like: {
          day: 50.77,
          night: 38.43,
          eve: 41.2,
          morn: 31.15
        },
        pressure: 1020,
        humidity: 44,
        dew_point: 31.87,
        wind_speed: 11.01,
        wind_deg: 313,
        wind_gust: 18.81,
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: 1,
        pop: 0,
        uvi: 4
      },
      {
        dt: 1676232000,
        sunrise: 1676213965,
        sunset: 1676252307,
        moonrise: 0,
        moonset: 1676226000,
        moon_phase: 0.72,
        temp: {
          day: 56.59,
          min: 36.27,
          max: 57.96,
          night: 45,
          eve: 48.11,
          morn: 36.27
        },
        feels_like: {
          day: 54.1,
          night: 43.75,
          eve: 48.11,
          morn: 36.27
        },
        pressure: 1019,
        humidity: 46,
        dew_point: 35.76,
        wind_speed: 4.92,
        wind_deg: 299,
        wind_gust: 9.53,
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02d'
          }
        ],
        clouds: 16,
        pop: 0,
        uvi: 4
      }
    ]
  },
  {
    lat: 38.5981,
    lon: -121.2153,
    timezone: 'America/Los_Angeles',
    timezone_offset: -28800,
    current: {
      dt: 1675655358,
      sunrise: 1675609617,
      sunset: 1675647047,
      temp: 46.33,
      feels_like: 46.33,
      pressure: 1025,
      humidity: 84,
      dew_point: 41.77,
      uvi: 0,
      clouds: 0,
      visibility: 10000,
      wind_speed: 0,
      wind_deg: 0,
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n'
        }
      ]
    },
    daily: [
      {
        dt: 1675627200,
        sunrise: 1675609617,
        sunset: 1675647047,
        moonrise: 1675647240,
        moonset: 1675611000,
        moon_phase: 0.5,
        temp: {
          day: 53.22,
          min: 44.29,
          max: 53.78,
          night: 44.29,
          eve: 46.44,
          morn: 45.59
        },
        feels_like: {
          day: 51.76,
          night: 44.29,
          eve: 46.44,
          morn: 42.3
        },
        pressure: 1022,
        humidity: 75,
        dew_point: 45.23,
        wind_speed: 10.29,
        wind_deg: 216,
        wind_gust: 22.5,
        weather: [
          {
            id: 501,
            main: 'Rain',
            description: 'moderate rain',
            icon: '10d'
          }
        ],
        clouds: 61,
        pop: 0.92,
        rain: 11.13,
        uvi: 1.75
      },
      {
        dt: 1675713600,
        sunrise: 1675695958,
        sunset: 1675733516,
        moonrise: 1675737240,
        moonset: 1675699140,
        moon_phase: 0.53,
        temp: {
          day: 51.26,
          min: 37.65,
          max: 55.69,
          night: 42.62,
          eve: 47.77,
          morn: 38.26
        },
        feels_like: {
          day: 48.9,
          night: 41.16,
          eve: 46.47,
          morn: 34.97
        },
        pressure: 1029,
        humidity: 60,
        dew_point: 37.56,
        wind_speed: 7.72,
        wind_deg: 315,
        wind_gust: 13.33,
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: 0,
        pop: 0,
        uvi: 2.86
      },
      {
        dt: 1675800000,
        sunrise: 1675782297,
        sunset: 1675819985,
        moonrise: 1675827300,
        moonset: 1675787040,
        moon_phase: 0.56,
        temp: {
          day: 52.36,
          min: 38.71,
          max: 55.92,
          night: 43.93,
          eve: 47.86,
          morn: 39.2
        },
        feels_like: {
          day: 50.31,
          night: 43.93,
          eve: 47.86,
          morn: 37.06
        },
        pressure: 1029,
        humidity: 64,
        dew_point: 40.57,
        wind_speed: 4.88,
        wind_deg: 121,
        wind_gust: 9.1,
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d'
          }
        ],
        clouds: 100,
        pop: 0,
        uvi: 2.11
      },
      {
        dt: 1675886400,
        sunrise: 1675868635,
        sunset: 1675906455,
        moonrise: 1675917240,
        moonset: 1675874820,
        moon_phase: 0.59,
        temp: {
          day: 57.6,
          min: 40.57,
          max: 57.83,
          night: 46.35,
          eve: 48.83,
          morn: 40.8
        },
        feels_like: {
          day: 55.74,
          night: 46.35,
          eve: 47.57,
          morn: 40.8
        },
        pressure: 1027,
        humidity: 57,
        dew_point: 42.26,
        wind_speed: 6.93,
        wind_deg: 327,
        wind_gust: 10.56,
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02d'
          }
        ],
        clouds: 13,
        pop: 0,
        uvi: 3.06
      },
      {
        dt: 1675972800,
        sunrise: 1675954972,
        sunset: 1675992924,
        moonrise: 1676007300,
        moonset: 1675962540,
        moon_phase: 0.62,
        temp: {
          day: 59.68,
          min: 41.68,
          max: 60.19,
          night: 47.93,
          eve: 50.88,
          morn: 41.68
        },
        feels_like: {
          day: 58.12,
          night: 46.6,
          eve: 49.57,
          morn: 41.68
        },
        pressure: 1025,
        humidity: 59,
        dew_point: 45.12,
        wind_speed: 3.85,
        wind_deg: 121,
        wind_gust: 5.21,
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d'
          }
        ],
        clouds: 88,
        pop: 0,
        uvi: 3.2
      },
      {
        dt: 1676059200,
        sunrise: 1676041307,
        sunset: 1676079392,
        moonrise: 1676097360,
        moonset: 1676050260,
        moon_phase: 0.66,
        temp: {
          day: 52.61,
          min: 42.55,
          max: 53.64,
          night: 42.55,
          eve: 45.55,
          morn: 43
        },
        feels_like: {
          day: 50.77,
          night: 42.55,
          eve: 45.55,
          morn: 40.37
        },
        pressure: 1023,
        humidity: 68,
        dew_point: 42.31,
        wind_speed: 7.85,
        wind_deg: 296,
        wind_gust: 15.68,
        weather: [
          {
            id: 500,
            main: 'Rain',
            description: 'light rain',
            icon: '10d'
          }
        ],
        clouds: 37,
        pop: 0.38,
        rain: 0.32,
        uvi: 4
      },
      {
        dt: 1676145600,
        sunrise: 1676127641,
        sunset: 1676165861,
        moonrise: 1676187660,
        moonset: 1676138040,
        moon_phase: 0.69,
        temp: {
          day: 53.35,
          min: 36.25,
          max: 53.67,
          night: 41.67,
          eve: 45.68,
          morn: 36.25
        },
        feels_like: {
          day: 50.4,
          night: 39.16,
          eve: 42.33,
          morn: 31.12
        },
        pressure: 1021,
        humidity: 43,
        dew_point: 31.57,
        wind_speed: 11.39,
        wind_deg: 320,
        wind_gust: 19.33,
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: 1,
        pop: 0,
        uvi: 4
      },
      {
        dt: 1676232000,
        sunrise: 1676213973,
        sunset: 1676252329,
        moonrise: 0,
        moonset: 1676226060,
        moon_phase: 0.72,
        temp: {
          day: 56.41,
          min: 35.83,
          max: 58.3,
          night: 44.78,
          eve: 48.61,
          morn: 35.83
        },
        feels_like: {
          day: 53.82,
          night: 43.36,
          eve: 48.61,
          morn: 35.83
        },
        pressure: 1019,
        humidity: 44,
        dew_point: 34.38,
        wind_speed: 4.85,
        wind_deg: 320,
        wind_gust: 9.78,
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02d'
          }
        ],
        clouds: 12,
        pop: 0,
        uvi: 4
      }
    ]
  },
  {
    lat: 34.026,
    lon: -84.147,
    timezone: 'America/New_York',
    timezone_offset: -18000,
    current: {
      dt: 1675655444,
      sunrise: 1675600250,
      sunset: 1675638620,
      temp: 45.99,
      feels_like: 43.77,
      pressure: 1020,
      humidity: 80,
      dew_point: 40.17,
      uvi: 0,
      clouds: 0,
      visibility: 10000,
      wind_speed: 4.61,
      wind_deg: 260,
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n'
        }
      ]
    },
    daily: [
      {
        dt: 1675616400,
        sunrise: 1675600250,
        sunset: 1675638620,
        moonrise: 1675638600,
        moonset: 1675601220,
        moon_phase: 0.5,
        temp: {
          day: 50.14,
          min: 36.21,
          max: 58.1,
          night: 45.99,
          eve: 53.76,
          morn: 36.66
        },
        feels_like: {
          day: 47.62,
          night: 42.37,
          eve: 51.75,
          morn: 33.71
        },
        pressure: 1026,
        humidity: 59,
        dew_point: 36.09,
        wind_speed: 7.29,
        wind_deg: 239,
        wind_gust: 25.12,
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d'
          }
        ],
        clouds: 100,
        pop: 0,
        uvi: 3.15
      },
      {
        dt: 1675702800,
        sunrise: 1675686601,
        sunset: 1675725079,
        moonrise: 1675728480,
        moonset: 1675689480,
        moon_phase: 0.53,
        temp: {
          day: 57.36,
          min: 41.79,
          max: 61.83,
          night: 49.46,
          eve: 56.17,
          morn: 42.44
        },
        feels_like: {
          day: 54.54,
          night: 48.85,
          eve: 53.47,
          morn: 39.97
        },
        pressure: 1023,
        humidity: 37,
        dew_point: 31.08,
        wind_speed: 9.17,
        wind_deg: 303,
        wind_gust: 28.05,
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: 0,
        pop: 0,
        uvi: 4.28
      },
      {
        dt: 1675789200,
        sunrise: 1675772951,
        sunset: 1675811538,
        moonrise: 1675818300,
        moonset: 1675777620,
        moon_phase: 0.56,
        temp: {
          day: 57.22,
          min: 43.02,
          max: 62.58,
          night: 54.43,
          eve: 58.05,
          morn: 43.7
        },
        feels_like: {
          day: 54.72,
          night: 52.54,
          eve: 56.05,
          morn: 41.2
        },
        pressure: 1027,
        humidity: 44,
        dew_point: 35.24,
        wind_speed: 6.04,
        wind_deg: 170,
        wind_gust: 11.07,
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d'
          }
        ],
        clouds: 98,
        pop: 0,
        uvi: 3.96
      },
      {
        dt: 1675875600,
        sunrise: 1675859299,
        sunset: 1675897997,
        moonrise: 1675908120,
        moonset: 1675865580,
        moon_phase: 0.59,
        temp: {
          day: 61,
          min: 49.98,
          max: 62.92,
          night: 60.44,
          eve: 59.18,
          morn: 50.61
        },
        feels_like: {
          day: 59.9,
          night: 59.85,
          eve: 58.69,
          morn: 48.81
        },
        pressure: 1025,
        humidity: 66,
        dew_point: 49.39,
        wind_speed: 7.47,
        wind_deg: 144,
        wind_gust: 27.67,
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d'
          }
        ],
        clouds: 100,
        pop: 0,
        uvi: 2.32
      },
      {
        dt: 1675962000,
        sunrise: 1675945647,
        sunset: 1675984456,
        moonrise: 1675998000,
        moonset: 1675953480,
        moon_phase: 0.62,
        temp: {
          day: 57,
          min: 55.29,
          max: 60.4,
          night: 55.29,
          eve: 56.64,
          morn: 58.41
        },
        feels_like: {
          day: 56.26,
          night: 54.57,
          eve: 55.81,
          morn: 58.17
        },
        pressure: 1019,
        humidity: 82,
        dew_point: 51.04,
        wind_speed: 10.89,
        wind_deg: 178,
        wind_gust: 34.23,
        weather: [
          {
            id: 501,
            main: 'Rain',
            description: 'moderate rain',
            icon: '10d'
          }
        ],
        clouds: 100,
        pop: 1,
        rain: 10.82,
        uvi: 3.62
      },
      {
        dt: 1676048400,
        sunrise: 1676031992,
        sunset: 1676070914,
        moonrise: 1676087880,
        moonset: 1676041320,
        moon_phase: 0.65,
        temp: {
          day: 60.19,
          min: 45.63,
          max: 61.65,
          night: 45.63,
          eve: 52.41,
          morn: 56.12
        },
        feels_like: {
          day: 59.43,
          night: 39.07,
          eve: 49.84,
          morn: 56.08
        },
        pressure: 1011,
        humidity: 75,
        dew_point: 51.76,
        wind_speed: 14.9,
        wind_deg: 283,
        wind_gust: 27.6,
        weather: [
          {
            id: 501,
            main: 'Rain',
            description: 'moderate rain',
            icon: '10d'
          }
        ],
        clouds: 100,
        pop: 1,
        rain: 7.72,
        uvi: 4
      },
      {
        dt: 1676134800,
        sunrise: 1676118337,
        sunset: 1676157372,
        moonrise: 1676177940,
        moonset: 1676129280,
        moon_phase: 0.68,
        temp: {
          day: 46.92,
          min: 37.27,
          max: 47.23,
          night: 37.27,
          eve: 41.07,
          morn: 38.25
        },
        feels_like: {
          day: 40.8,
          night: 32,
          eve: 34.56,
          morn: 29.64
        },
        pressure: 1021,
        humidity: 46,
        dew_point: 27.09,
        wind_speed: 14.83,
        wind_deg: 301,
        wind_gust: 28.01,
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d'
          }
        ],
        clouds: 89,
        pop: 0.01,
        uvi: 4
      },
      {
        dt: 1676221200,
        sunrise: 1676204680,
        sunset: 1676243829,
        moonrise: 0,
        moonset: 1676217480,
        moon_phase: 0.72,
        temp: {
          day: 51.67,
          min: 34.3,
          max: 53.69,
          night: 42.6,
          eve: 46.22,
          morn: 34.3
        },
        feels_like: {
          day: 47.86,
          night: 38.62,
          eve: 42.57,
          morn: 30.67
        },
        pressure: 1029,
        humidity: 28,
        dew_point: 19.15,
        wind_speed: 7.7,
        wind_deg: 116,
        wind_gust: 16.28,
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02d'
          }
        ],
        clouds: 19,
        pop: 0,
        uvi: 4
      }
    ]
  },
  {
    lat: 44.8471,
    lon: -93.1543,
    timezone: 'America/Chicago',
    timezone_offset: -21600,
    current: {
      dt: 1675655470,
      sunrise: 1675603653,
      sunset: 1675639541,
      temp: 18.77,
      feels_like: 10.72,
      pressure: 1020,
      humidity: 77,
      dew_point: 13.42,
      uvi: 0,
      clouds: 0,
      visibility: 10000,
      wind_speed: 5.75,
      wind_deg: 240,
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n'
        }
      ]
    },
    daily: [
      {
        dt: 1675620000,
        sunrise: 1675603653,
        sunset: 1675639541,
        moonrise: 1675639140,
        moonset: 1675605300,
        moon_phase: 0.5,
        temp: {
          day: 25.93,
          min: 13.86,
          max: 26.96,
          night: 16.09,
          eve: 14.95,
          morn: 17.56
        },
        feels_like: {
          day: 17.33,
          night: 9.34,
          eve: 9.95,
          morn: 8.02
        },
        pressure: 1018,
        humidity: 84,
        dew_point: 21.72,
        wind_speed: 8.19,
        wind_deg: 331,
        wind_gust: 20.22,
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02d'
          }
        ],
        clouds: 19,
        pop: 0,
        uvi: 1.95
      },
      {
        dt: 1675706400,
        sunrise: 1675689977,
        sunset: 1675726027,
        moonrise: 1675729440,
        moonset: 1675693140,
        moon_phase: 0.53,
        temp: {
          day: 33.46,
          min: 12.85,
          max: 35.06,
          night: 34.12,
          eve: 34.9,
          morn: 17.02
        },
        feels_like: {
          day: 23.54,
          night: 24.89,
          eve: 26.26,
          morn: 6.31
        },
        pressure: 1009,
        humidity: 91,
        dew_point: 31.05,
        wind_speed: 14.74,
        wind_deg: 152,
        wind_gust: 43.42,
        weather: [
          {
            id: 500,
            main: 'Rain',
            description: 'light rain',
            icon: '10d'
          }
        ],
        clouds: 80,
        pop: 0.27,
        rain: 0.3,
        uvi: 1.98
      },
      {
        dt: 1675792800,
        sunrise: 1675776299,
        sunset: 1675812514,
        moonrise: 1675819800,
        moonset: 1675780800,
        moon_phase: 0.56,
        temp: {
          day: 29.61,
          min: 22.03,
          max: 33.93,
          night: 22.37,
          eve: 24.04,
          morn: 28.81
        },
        feels_like: {
          day: 20.8,
          night: 15.73,
          eve: 18.23,
          morn: 17.83
        },
        pressure: 1018,
        humidity: 84,
        dew_point: 25.21,
        wind_speed: 14.56,
        wind_deg: 284,
        wind_gust: 32.19,
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: 10,
        pop: 0.09,
        uvi: 2.19
      },
      {
        dt: 1675879200,
        sunrise: 1675862620,
        sunset: 1675899000,
        moonrise: 1675910040,
        moonset: 1675868280,
        moon_phase: 0.59,
        temp: {
          day: 33.33,
          min: 22.33,
          max: 33.33,
          night: 23.81,
          eve: 28.09,
          morn: 22.89
        },
        feels_like: {
          day: 27.57,
          night: 19.24,
          eve: 21.36,
          morn: 15.6
        },
        pressure: 1017,
        humidity: 99,
        dew_point: 33.13,
        wind_speed: 7.58,
        wind_deg: 196,
        wind_gust: 22.95,
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: 3,
        pop: 0,
        uvi: 2.34
      },
      {
        dt: 1675965600,
        sunrise: 1675948940,
        sunset: 1675985486,
        moonrise: 1676000400,
        moonset: 1675955760,
        moon_phase: 0.62,
        temp: {
          day: 30.31,
          min: 23.61,
          max: 31.26,
          night: 30.83,
          eve: 31.26,
          morn: 23.61
        },
        feels_like: {
          day: 24.04,
          night: 21.43,
          eve: 23.86,
          morn: 23.61
        },
        pressure: 1015,
        humidity: 96,
        dew_point: 29.17,
        wind_speed: 11.72,
        wind_deg: 332,
        wind_gust: 25.43,
        weather: [
          {
            id: 600,
            main: 'Snow',
            description: 'light snow',
            icon: '13d'
          }
        ],
        clouds: 77,
        pop: 0.86,
        snow: 0.67,
        uvi: 2.25
      },
      {
        dt: 1676052000,
        sunrise: 1676035257,
        sunset: 1676071972,
        moonrise: 1676090760,
        moonset: 1676043180,
        moon_phase: 0.65,
        temp: {
          day: 19.11,
          min: 11.66,
          max: 23.76,
          night: 11.66,
          eve: 15.24,
          morn: 13.06
        },
        feels_like: {
          day: 8.89,
          night: 11.66,
          eve: 9.7,
          morn: 1.18
        },
        pressure: 1025,
        humidity: 84,
        dew_point: 14.63,
        wind_speed: 12.44,
        wind_deg: 330,
        wind_gust: 27.34,
        weather: [
          {
            id: 803,
            main: 'Clouds',
            description: 'broken clouds',
            icon: '04d'
          }
        ],
        clouds: 58,
        pop: 0.27,
        uvi: 3
      },
      {
        dt: 1676138400,
        sunrise: 1676121574,
        sunset: 1676158458,
        moonrise: 1676181300,
        moonset: 1676130720,
        moon_phase: 0.69,
        temp: {
          day: 26.17,
          min: 10.29,
          max: 29.57,
          night: 29.57,
          eve: 27.79,
          morn: 12.04
        },
        feels_like: {
          day: 15.31,
          night: 18.91,
          eve: 17.13,
          morn: 2.64
        },
        pressure: 1021,
        humidity: 77,
        dew_point: 19.87,
        wind_speed: 13.87,
        wind_deg: 178,
        wind_gust: 38.5,
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d'
          }
        ],
        clouds: 100,
        pop: 0,
        uvi: 3
      },
      {
        dt: 1676224800,
        sunrise: 1676207889,
        sunset: 1676244944,
        moonrise: 0,
        moonset: 1676218380,
        moon_phase: 0.72,
        temp: {
          day: 31.59,
          min: 25.61,
          max: 32.2,
          night: 25.61,
          eve: 27.82,
          morn: 28.17
        },
        feels_like: {
          day: 26.26,
          night: 25.61,
          eve: 24.49,
          morn: 20.77
        },
        pressure: 1014,
        humidity: 98,
        dew_point: 31.08,
        wind_speed: 12.33,
        wind_deg: 192,
        wind_gust: 36.04,
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d'
          }
        ],
        clouds: 96,
        pop: 0,
        uvi: 3
      }
    ]
  },
  {
    lat: 33.8444,
    lon: -84.4741,
    timezone: 'America/New_York',
    timezone_offset: -18000,
    current: {
      dt: 1675655533,
      sunrise: 1675600310,
      sunset: 1675638717,
      temp: 45.81,
      feels_like: 43.56,
      pressure: 1021,
      humidity: 81,
      dew_point: 40.32,
      uvi: 0,
      clouds: 0,
      visibility: 10000,
      wind_speed: 4.61,
      wind_deg: 280,
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n'
        }
      ]
    },
    daily: [
      {
        dt: 1675616400,
        sunrise: 1675600310,
        sunset: 1675638717,
        moonrise: 1675638720,
        moonset: 1675601280,
        moon_phase: 0.5,
        temp: {
          day: 48.9,
          min: 39.2,
          max: 60.4,
          night: 45.81,
          eve: 56.05,
          morn: 39.87
        },
        feels_like: {
          day: 46.69,
          night: 42.35,
          eve: 54.12,
          morn: 36.97
        },
        pressure: 1026,
        humidity: 64,
        dew_point: 36.95,
        wind_speed: 8.23,
        wind_deg: 241,
        wind_gust: 24.27,
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d'
          }
        ],
        clouds: 100,
        pop: 0,
        uvi: 2.56
      },
      {
        dt: 1675702800,
        sunrise: 1675686662,
        sunset: 1675725175,
        moonrise: 1675728600,
        moonset: 1675689540,
        moon_phase: 0.53,
        temp: {
          day: 57.94,
          min: 43.32,
          max: 62.42,
          night: 51.6,
          eve: 58.06,
          morn: 44.4
        },
        feels_like: {
          day: 55.02,
          night: 48.63,
          eve: 55.17,
          morn: 41.4
        },
        pressure: 1024,
        humidity: 34,
        dew_point: 29.64,
        wind_speed: 8.25,
        wind_deg: 312,
        wind_gust: 26.91,
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: 0,
        pop: 0,
        uvi: 4.35
      },
      {
        dt: 1675789200,
        sunrise: 1675773012,
        sunset: 1675811634,
        moonrise: 1675818420,
        moonset: 1675777680,
        moon_phase: 0.56,
        temp: {
          day: 58.73,
          min: 45.36,
          max: 64.22,
          night: 56.91,
          eve: 60.73,
          morn: 45.91
        },
        feels_like: {
          day: 56.14,
          night: 55.08,
          eve: 58.75,
          morn: 43.81
        },
        pressure: 1027,
        humidity: 39,
        dew_point: 33.62,
        wind_speed: 6.96,
        wind_deg: 175,
        wind_gust: 14.94,
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d'
          }
        ],
        clouds: 97,
        pop: 0,
        uvi: 4.23
      },
      {
        dt: 1675875600,
        sunrise: 1675859361,
        sunset: 1675898092,
        moonrise: 1675908240,
        moonset: 1675865640,
        moon_phase: 0.59,
        temp: {
          day: 59.76,
          min: 52.7,
          max: 66.15,
          night: 63.07,
          eve: 62.6,
          morn: 53.28
        },
        feels_like: {
          day: 58.73,
          night: 62.37,
          eve: 61.99,
          morn: 51.49
        },
        pressure: 1024,
        humidity: 70,
        dew_point: 49.33,
        wind_speed: 9.75,
        wind_deg: 157,
        wind_gust: 28.77,
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d'
          }
        ],
        clouds: 100,
        pop: 0,
        uvi: 2.24
      },
      {
        dt: 1675962000,
        sunrise: 1675945709,
        sunset: 1675984550,
        moonrise: 1675998060,
        moonset: 1675953540,
        moon_phase: 0.62,
        temp: {
          day: 57.56,
          min: 55.4,
          max: 61.86,
          night: 55.4,
          eve: 56.14,
          morn: 59.85
        },
        feels_like: {
          day: 56.77,
          night: 54.77,
          eve: 55.49,
          morn: 59.81
        },
        pressure: 1019,
        humidity: 80,
        dew_point: 50.61,
        wind_speed: 12.68,
        wind_deg: 187,
        wind_gust: 33.96,
        weather: [
          {
            id: 501,
            main: 'Rain',
            description: 'moderate rain',
            icon: '10d'
          }
        ],
        clouds: 100,
        pop: 1,
        rain: 12.61,
        uvi: 3.21
      },
      {
        dt: 1676048400,
        sunrise: 1676032055,
        sunset: 1676071008,
        moonrise: 1676087940,
        moonset: 1676041440,
        moon_phase: 0.65,
        temp: {
          day: 60.6,
          min: 46.51,
          max: 61.63,
          night: 46.51,
          eve: 52.38,
          morn: 57.02
        },
        feels_like: {
          day: 59.61,
          night: 40.35,
          eve: 49.86,
          morn: 57.07
        },
        pressure: 1011,
        humidity: 69,
        dew_point: 50.13,
        wind_speed: 14.29,
        wind_deg: 282,
        wind_gust: 26.55,
        weather: [
          {
            id: 501,
            main: 'Rain',
            description: 'moderate rain',
            icon: '10d'
          }
        ],
        clouds: 100,
        pop: 1,
        rain: 7.44,
        uvi: 4
      },
      {
        dt: 1676134800,
        sunrise: 1676118400,
        sunset: 1676157466,
        moonrise: 1676178000,
        moonset: 1676129400,
        moon_phase: 0.68,
        temp: {
          day: 47.19,
          min: 39.16,
          max: 47.19,
          night: 39.27,
          eve: 42.42,
          morn: 39.16
        },
        feels_like: {
          day: 41,
          night: 33.78,
          eve: 36.14,
          morn: 31.05
        },
        pressure: 1021,
        humidity: 44,
        dew_point: 26.02,
        wind_speed: 15.19,
        wind_deg: 326,
        wind_gust: 26.82,
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d'
          }
        ],
        clouds: 86,
        pop: 0,
        uvi: 4
      },
      {
        dt: 1676221200,
        sunrise: 1676204744,
        sunset: 1676243923,
        moonrise: 0,
        moonset: 1676217600,
        moon_phase: 0.72,
        temp: {
          day: 52.72,
          min: 36.61,
          max: 55.67,
          night: 46.26,
          eve: 49.95,
          morn: 36.61
        },
        feels_like: {
          day: 48.78,
          night: 42.57,
          eve: 46.67,
          morn: 32.63
        },
        pressure: 1029,
        humidity: 23,
        dew_point: 15.66,
        wind_speed: 8.08,
        wind_deg: 118,
        wind_gust: 19.24,
        weather: [
          {
            id: 802,
            main: 'Clouds',
            description: 'scattered clouds',
            icon: '03d'
          }
        ],
        clouds: 26,
        pop: 0,
        uvi: 4
      }
    ]
  },
  {
    lat: 38.7609,
    lon: -121.2867,
    timezone: 'America/Los_Angeles',
    timezone_offset: -28800,
    current: {
      dt: 1675655561,
      sunrise: 1675609652,
      sunset: 1675647046,
      temp: 46.47,
      feels_like: 46.47,
      pressure: 1024,
      humidity: 81,
      dew_point: 40.96,
      uvi: 0,
      clouds: 0,
      visibility: 10000,
      wind_speed: 1.99,
      wind_deg: 97,
      wind_gust: 3,
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n'
        }
      ]
    },
    daily: [
      {
        dt: 1675627200,
        sunrise: 1675609652,
        sunset: 1675647046,
        moonrise: 1675647240,
        moonset: 1675611060,
        moon_phase: 0.5,
        temp: {
          day: 53.38,
          min: 44.64,
          max: 54.34,
          night: 44.64,
          eve: 46.87,
          morn: 46.24
        },
        feels_like: {
          day: 51.85,
          night: 44.64,
          eve: 46.87,
          morn: 42.48
        },
        pressure: 1022,
        humidity: 73,
        dew_point: 44.76,
        wind_speed: 10.67,
        wind_deg: 214,
        wind_gust: 21.34,
        weather: [
          {
            id: 501,
            main: 'Rain',
            description: 'moderate rain',
            icon: '10d'
          }
        ],
        clouds: 70,
        pop: 0.86,
        rain: 10.64,
        uvi: 1.75
      },
      {
        dt: 1675713600,
        sunrise: 1675695993,
        sunset: 1675733516,
        moonrise: 1675737240,
        moonset: 1675699140,
        moon_phase: 0.53,
        temp: {
          day: 51.51,
          min: 37.53,
          max: 55.78,
          night: 43.54,
          eve: 48.31,
          morn: 38.14
        },
        feels_like: {
          day: 49.19,
          night: 43.54,
          eve: 46.26,
          morn: 34.47
        },
        pressure: 1029,
        humidity: 60,
        dew_point: 37.89,
        wind_speed: 8.63,
        wind_deg: 317,
        wind_gust: 14.88,
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: 0,
        pop: 0,
        uvi: 2.86
      },
      {
        dt: 1675800000,
        sunrise: 1675782332,
        sunset: 1675819985,
        moonrise: 1675827300,
        moonset: 1675787040,
        moon_phase: 0.56,
        temp: {
          day: 51.53,
          min: 39.81,
          max: 55.8,
          night: 44.38,
          eve: 48.47,
          morn: 40.1
        },
        feels_like: {
          day: 49.39,
          night: 44.38,
          eve: 48.47,
          morn: 37.51
        },
        pressure: 1029,
        humidity: 64,
        dew_point: 39.51,
        wind_speed: 4.43,
        wind_deg: 127,
        wind_gust: 7,
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d'
          }
        ],
        clouds: 100,
        pop: 0,
        uvi: 2.11
      },
      {
        dt: 1675886400,
        sunrise: 1675868669,
        sunset: 1675906455,
        moonrise: 1675917300,
        moonset: 1675874820,
        moon_phase: 0.59,
        temp: {
          day: 57.31,
          min: 40.86,
          max: 57.79,
          night: 46.72,
          eve: 48.99,
          morn: 41.14
        },
        feels_like: {
          day: 55.47,
          night: 46.72,
          eve: 47.62,
          morn: 41.14
        },
        pressure: 1027,
        humidity: 58,
        dew_point: 42.78,
        wind_speed: 7.2,
        wind_deg: 325,
        wind_gust: 10.78,
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02d'
          }
        ],
        clouds: 16,
        pop: 0,
        uvi: 3.06
      },
      {
        dt: 1675972800,
        sunrise: 1675955005,
        sunset: 1675992924,
        moonrise: 1676007360,
        moonset: 1675962540,
        moon_phase: 0.62,
        temp: {
          day: 59.34,
          min: 42.48,
          max: 60.35,
          night: 48.83,
          eve: 51.67,
          morn: 42.48
        },
        feels_like: {
          day: 57.65,
          night: 47.3,
          eve: 50.25,
          morn: 42.48
        },
        pressure: 1025,
        humidity: 57,
        dew_point: 44.1,
        wind_speed: 4.29,
        wind_deg: 120,
        wind_gust: 5.12,
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d'
          }
        ],
        clouds: 97,
        pop: 0,
        uvi: 3.2
      },
      {
        dt: 1676059200,
        sunrise: 1676041340,
        sunset: 1676079393,
        moonrise: 1676097420,
        moonset: 1676050260,
        moon_phase: 0.66,
        temp: {
          day: 51.39,
          min: 42.85,
          max: 54.32,
          night: 42.85,
          eve: 46.13,
          morn: 43.38
        },
        feels_like: {
          day: 49.69,
          night: 41.13,
          eve: 46.13,
          morn: 40.19
        },
        pressure: 1023,
        humidity: 74,
        dew_point: 43.05,
        wind_speed: 7.76,
        wind_deg: 335,
        wind_gust: 16.33,
        weather: [
          {
            id: 500,
            main: 'Rain',
            description: 'light rain',
            icon: '10d'
          }
        ],
        clouds: 56,
        pop: 0.31,
        rain: 0.39,
        uvi: 4
      },
      {
        dt: 1676145600,
        sunrise: 1676127673,
        sunset: 1676165862,
        moonrise: 1676187720,
        moonset: 1676138040,
        moon_phase: 0.69,
        temp: {
          day: 53.02,
          min: 35.96,
          max: 53.78,
          night: 41.77,
          eve: 44.56,
          morn: 35.96
        },
        feels_like: {
          day: 50.14,
          night: 39,
          eve: 41.54,
          morn: 30.92
        },
        pressure: 1021,
        humidity: 45,
        dew_point: 32.29,
        wind_speed: 11.65,
        wind_deg: 319,
        wind_gust: 19.33,
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: 1,
        pop: 0,
        uvi: 4
      },
      {
        dt: 1676232000,
        sunrise: 1676214005,
        sunset: 1676252331,
        moonrise: 0,
        moonset: 1676226060,
        moon_phase: 0.72,
        temp: {
          day: 56.77,
          min: 37.06,
          max: 58.75,
          night: 46.63,
          eve: 49.53,
          morn: 37.06
        },
        feels_like: {
          day: 54.36,
          night: 46.63,
          eve: 49.53,
          morn: 37.06
        },
        pressure: 1019,
        humidity: 47,
        dew_point: 36.45,
        wind_speed: 5.84,
        wind_deg: 322,
        wind_gust: 11.63,
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02d'
          }
        ],
        clouds: 17,
        pop: 0,
        uvi: 4
      }
    ]
  },
  {
    lat: 25.4573,
    lon: -80.4572,
    timezone: 'America/New_York',
    timezone_offset: -18000,
    current: {
      dt: 1675655639,
      sunrise: 1675598594,
      sunset: 1675638504,
      temp: 70.43,
      feels_like: 71.64,
      pressure: 1019,
      humidity: 95,
      dew_point: 68.94,
      uvi: 0,
      clouds: 0,
      visibility: 10000,
      wind_speed: 0,
      wind_deg: 0,
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n'
        }
      ]
    },
    daily: [
      {
        dt: 1675616400,
        sunrise: 1675598594,
        sunset: 1675638504,
        moonrise: 1675638720,
        moonset: 1675599180,
        moon_phase: 0.5,
        temp: {
          day: 79.81,
          min: 68.47,
          max: 80.83,
          night: 70.43,
          eve: 76.66,
          morn: 68.99
        },
        feels_like: {
          day: 79.81,
          night: 71.64,
          eve: 77.07,
          morn: 69.73
        },
        pressure: 1020,
        humidity: 60,
        dew_point: 64.38,
        wind_speed: 14.2,
        wind_deg: 84,
        wind_gust: 22.48,
        weather: [
          {
            id: 500,
            main: 'Rain',
            description: 'light rain',
            icon: '10d'
          }
        ],
        clouds: 8,
        pop: 0.8,
        rain: 4.07,
        uvi: 7.65
      },
      {
        dt: 1675702800,
        sunrise: 1675684962,
        sunset: 1675724947,
        moonrise: 1675728360,
        moonset: 1675687740,
        moon_phase: 0.53,
        temp: {
          day: 77.27,
          min: 68.52,
          max: 77.31,
          night: 70.54,
          eve: 73.51,
          morn: 68.67
        },
        feels_like: {
          day: 77.56,
          night: 70.68,
          eve: 73.76,
          morn: 69.19
        },
        pressure: 1021,
        humidity: 61,
        dew_point: 62.87,
        wind_speed: 14.16,
        wind_deg: 62,
        wind_gust: 22.3,
        weather: [
          {
            id: 500,
            main: 'Rain',
            description: 'light rain',
            icon: '10d'
          }
        ],
        clouds: 33,
        pop: 0.27,
        rain: 0.36,
        uvi: 4.97
      },
      {
        dt: 1675789200,
        sunrise: 1675771328,
        sunset: 1675811390,
        moonrise: 1675817940,
        moonset: 1675776060,
        moon_phase: 0.56,
        temp: {
          day: 76.24,
          min: 67.62,
          max: 76.51,
          night: 70.39,
          eve: 71.89,
          morn: 67.71
        },
        feels_like: {
          day: 76.06,
          night: 70.23,
          eve: 71.78,
          morn: 67.57
        },
        pressure: 1024,
        humidity: 53,
        dew_point: 58.03,
        wind_speed: 17.38,
        wind_deg: 90,
        wind_gust: 21.74,
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02d'
          }
        ],
        clouds: 11,
        pop: 0,
        uvi: 7.29
      },
      {
        dt: 1675875600,
        sunrise: 1675857693,
        sunset: 1675897832,
        moonrise: 1675907460,
        moonset: 1675864320,
        moon_phase: 0.59,
        temp: {
          day: 78.37,
          min: 68.92,
          max: 78.71,
          night: 73.72,
          eve: 72.12,
          morn: 70.72
        },
        feels_like: {
          day: 78.44,
          night: 74.17,
          eve: 72.46,
          morn: 70.65
        },
        pressure: 1023,
        humidity: 54,
        dew_point: 60.4,
        wind_speed: 15.68,
        wind_deg: 93,
        wind_gust: 20.74,
        weather: [
          {
            id: 803,
            main: 'Clouds',
            description: 'broken clouds',
            icon: '04d'
          }
        ],
        clouds: 63,
        pop: 0,
        uvi: 7.47
      },
      {
        dt: 1675962000,
        sunrise: 1675944057,
        sunset: 1675984274,
        moonrise: 1675996980,
        moonset: 1675952520,
        moon_phase: 0.62,
        temp: {
          day: 79.72,
          min: 73.18,
          max: 79.72,
          night: 73.18,
          eve: 73.36,
          morn: 73.27
        },
        feels_like: {
          day: 79.72,
          night: 73.78,
          eve: 73.98,
          morn: 73.98
        },
        pressure: 1021,
        humidity: 61,
        dew_point: 65.12,
        wind_speed: 15.37,
        wind_deg: 105,
        wind_gust: 21.27,
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d'
          }
        ],
        clouds: 88,
        pop: 0.05,
        uvi: 6.3
      },
      {
        dt: 1676048400,
        sunrise: 1676030420,
        sunset: 1676070715,
        moonrise: 1676086560,
        moonset: 1676040660,
        moon_phase: 0.65,
        temp: {
          day: 80.89,
          min: 70.05,
          max: 80.89,
          night: 72.36,
          eve: 73.54,
          morn: 70.05
        },
        feels_like: {
          day: 82.51,
          night: 73.29,
          eve: 74.44,
          morn: 70.66
        },
        pressure: 1019,
        humidity: 57,
        dew_point: 64.35,
        wind_speed: 13.78,
        wind_deg: 138,
        wind_gust: 22.39,
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02d'
          }
        ],
        clouds: 17,
        pop: 0.15,
        uvi: 7
      },
      {
        dt: 1676134800,
        sunrise: 1676116782,
        sunset: 1676157156,
        moonrise: 1676176320,
        moonset: 1676128920,
        moon_phase: 0.68,
        temp: {
          day: 72.41,
          min: 59.14,
          max: 72.41,
          night: 59.14,
          eve: 64.83,
          morn: 68.38
        },
        feels_like: {
          day: 72.09,
          night: 56.82,
          eve: 63.03,
          morn: 69.24
        },
        pressure: 1017,
        humidity: 58,
        dew_point: 57,
        wind_speed: 18.88,
        wind_deg: 320,
        wind_gust: 24.99,
        weather: [
          {
            id: 500,
            main: 'Rain',
            description: 'light rain',
            icon: '10d'
          }
        ],
        clouds: 68,
        pop: 0.85,
        rain: 0.98,
        uvi: 7
      },
      {
        dt: 1676221200,
        sunrise: 1676203142,
        sunset: 1676243596,
        moonrise: 0,
        moonset: 1676217360,
        moon_phase: 0.72,
        temp: {
          day: 72.75,
          min: 53.01,
          max: 72.75,
          night: 67.96,
          eve: 67.84,
          morn: 54.18
        },
        feels_like: {
          day: 71.89,
          night: 67.19,
          eve: 66.9,
          morn: 52.21
        },
        pressure: 1021,
        humidity: 46,
        dew_point: 50.68,
        wind_speed: 22.19,
        wind_deg: 57,
        wind_gust: 28.23,
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: 1,
        pop: 0,
        uvi: 7
      }
    ]
  },
  {
    lat: 43.7069,
    lon: -116.362,
    timezone: 'America/Boise',
    timezone_offset: -25200,
    current: {
      dt: 1675655672,
      sunrise: 1675609066,
      sunset: 1675645268,
      temp: 40.96,
      feels_like: 32.76,
      pressure: 1017,
      humidity: 53,
      dew_point: 25.95,
      uvi: 0,
      clouds: 100,
      visibility: 10000,
      wind_speed: 16.11,
      wind_deg: 310,
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n'
        }
      ],
      rain: {
        '1h': 0.27
      }
    },
    daily: [
      {
        dt: 1675623600,
        sunrise: 1675609066,
        sunset: 1675645268,
        moonrise: 1675645200,
        moonset: 1675610700,
        moon_phase: 0.5,
        temp: {
          day: 38.32,
          min: 33.84,
          max: 44.26,
          night: 38.52,
          eve: 39.16,
          morn: 33.84
        },
        feels_like: {
          day: 33.78,
          night: 38.52,
          eve: 35.83,
          morn: 24.93
        },
        pressure: 1016,
        humidity: 92,
        dew_point: 34.83,
        wind_speed: 14.16,
        wind_deg: 135,
        wind_gust: 24.9,
        weather: [
          {
            id: 616,
            main: 'Snow',
            description: 'rain and snow',
            icon: '13d'
          }
        ],
        clouds: 100,
        pop: 0.85,
        rain: 5.65,
        snow: 2.93,
        uvi: 0.89
      },
      {
        dt: 1675710000,
        sunrise: 1675695394,
        sunset: 1675731751,
        moonrise: 1675735440,
        moonset: 1675698600,
        moon_phase: 0.53,
        temp: {
          day: 36.9,
          min: 31.08,
          max: 39.33,
          night: 32.04,
          eve: 34.84,
          morn: 32.07
        },
        feels_like: {
          day: 29.73,
          night: 27.3,
          eve: 30.25,
          morn: 26.78
        },
        pressure: 1029,
        humidity: 70,
        dew_point: 26.19,
        wind_speed: 11.12,
        wind_deg: 304,
        wind_gust: 15.75,
        weather: [
          {
            id: 600,
            main: 'Snow',
            description: 'light snow',
            icon: '13d'
          }
        ],
        clouds: 64,
        pop: 0.64,
        snow: 0.87,
        uvi: 1.94
      },
      {
        dt: 1675796400,
        sunrise: 1675781719,
        sunset: 1675818234,
        moonrise: 1675825680,
        moonset: 1675786320,
        moon_phase: 0.56,
        temp: {
          day: 40.28,
          min: 30.4,
          max: 41.94,
          night: 36.25,
          eve: 37.49,
          morn: 30.4
        },
        feels_like: {
          day: 36.75,
          night: 29.55,
          eve: 32,
          morn: 30.4
        },
        pressure: 1029,
        humidity: 65,
        dew_point: 28.06,
        wind_speed: 11.74,
        wind_deg: 120,
        wind_gust: 21.65,
        weather: [
          {
            id: 500,
            main: 'Rain',
            description: 'light rain',
            icon: '10d'
          }
        ],
        clouds: 98,
        pop: 0.56,
        rain: 1.45,
        uvi: 1.8
      },
      {
        dt: 1675882800,
        sunrise: 1675868044,
        sunset: 1675904717,
        moonrise: 1675915920,
        moonset: 1675873860,
        moon_phase: 0.59,
        temp: {
          day: 35.28,
          min: 28.31,
          max: 37.9,
          night: 28.51,
          eve: 36.27,
          morn: 28.56
        },
        feels_like: {
          day: 27.81,
          night: 23.54,
          eve: 30.47,
          morn: 21.99
        },
        pressure: 1033,
        humidity: 59,
        dew_point: 21.11,
        wind_speed: 11.54,
        wind_deg: 305,
        wind_gust: 27.25,
        weather: [
          {
            id: 616,
            main: 'Snow',
            description: 'rain and snow',
            icon: '13d'
          }
        ],
        clouds: 61,
        pop: 0.61,
        rain: 1.02,
        snow: 0.43,
        uvi: 2
      },
      {
        dt: 1675969200,
        sunrise: 1675954366,
        sunset: 1675991200,
        moonrise: 1676006160,
        moonset: 1675961400,
        moon_phase: 0.62,
        temp: {
          day: 33.75,
          min: 26.33,
          max: 38.55,
          night: 28.63,
          eve: 36.46,
          morn: 26.76
        },
        feels_like: {
          day: 27.66,
          night: 20.43,
          eve: 29.14,
          morn: 26.76
        },
        pressure: 1036,
        humidity: 49,
        dew_point: 15.51,
        wind_speed: 10.6,
        wind_deg: 150,
        wind_gust: 16.89,
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02d'
          }
        ],
        clouds: 12,
        pop: 0,
        uvi: 2.27
      },
      {
        dt: 1676055600,
        sunrise: 1676040687,
        sunset: 1676077682,
        moonrise: 1676096520,
        moonset: 1676048880,
        moon_phase: 0.66,
        temp: {
          day: 31.71,
          min: 26.55,
          max: 35.02,
          night: 27.21,
          eve: 31.64,
          morn: 27.54
        },
        feels_like: {
          day: 26.58,
          night: 27.21,
          eve: 26.2,
          morn: 20.71
        },
        pressure: 1025,
        humidity: 50,
        dew_point: 13.73,
        wind_speed: 8.1,
        wind_deg: 145,
        wind_gust: 15.28,
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d'
          }
        ],
        clouds: 96,
        pop: 0,
        uvi: 3
      },
      {
        dt: 1676142000,
        sunrise: 1676127007,
        sunset: 1676164165,
        moonrise: 0,
        moonset: 1676136420,
        moon_phase: 0.69,
        temp: {
          day: 32.13,
          min: 26.4,
          max: 35.92,
          night: 28.27,
          eve: 35.2,
          morn: 26.98
        },
        feels_like: {
          day: 25.07,
          night: 24.15,
          eve: 27.75,
          morn: 22.5
        },
        pressure: 1025,
        humidity: 68,
        dew_point: 21.45,
        wind_speed: 11.52,
        wind_deg: 310,
        wind_gust: 14.45,
        weather: [
          {
            id: 803,
            main: 'Clouds',
            description: 'broken clouds',
            icon: '04d'
          }
        ],
        clouds: 73,
        pop: 0,
        uvi: 3
      },
      {
        dt: 1676228400,
        sunrise: 1676213325,
        sunset: 1676250647,
        moonrise: 1676187000,
        moonset: 1676224200,
        moon_phase: 0.72,
        temp: {
          day: 33.98,
          min: 27.97,
          max: 36.01,
          night: 33.62,
          eve: 36.01,
          morn: 28.9
        },
        feels_like: {
          day: 33.98,
          night: 33.62,
          eve: 32.56,
          morn: 28.9
        },
        pressure: 1024,
        humidity: 65,
        dew_point: 22.21,
        wind_speed: 4.16,
        wind_deg: 349,
        wind_gust: 5.93,
        weather: [
          {
            id: 600,
            main: 'Snow',
            description: 'light snow',
            icon: '13d'
          }
        ],
        clouds: 100,
        pop: 0.26,
        snow: 0.27,
        uvi: 3
      }
    ]
  },
  {
    lat: 46.028,
    lon: -114.1938,
    timezone: 'America/Denver',
    timezone_offset: -25200,
    current: {
      dt: 1675655710,
      sunrise: 1675608862,
      sunset: 1675644431,
      temp: 30.78,
      feels_like: 25.48,
      pressure: 1013,
      humidity: 92,
      dew_point: 28.98,
      uvi: 0,
      clouds: 100,
      visibility: 7397,
      wind_speed: 5.17,
      wind_deg: 242,
      wind_gust: 9.75,
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04n'
        }
      ]
    },
    daily: [
      {
        dt: 1675623600,
        sunrise: 1675608862,
        sunset: 1675644431,
        moonrise: 1675644180,
        moonset: 1675610640,
        moon_phase: 0.5,
        temp: {
          day: 38.84,
          min: 27.07,
          max: 41.07,
          night: 30.51,
          eve: 33.03,
          morn: 28.67
        },
        feels_like: {
          day: 34.77,
          night: 24.91,
          eve: 27.95,
          morn: 23.83
        },
        pressure: 1007,
        humidity: 87,
        dew_point: 30.99,
        wind_speed: 6.4,
        wind_deg: 247,
        wind_gust: 11.59,
        weather: [
          {
            id: 601,
            main: 'Snow',
            description: 'snow',
            icon: '13d'
          }
        ],
        clouds: 97,
        pop: 0.8,
        snow: 2.63,
        uvi: 1.51
      },
      {
        dt: 1675710000,
        sunrise: 1675695182,
        sunset: 1675730921,
        moonrise: 1675734600,
        moonset: 1675698420,
        moon_phase: 0.53,
        temp: {
          day: 37.51,
          min: 26.73,
          max: 38.01,
          night: 26.73,
          eve: 29.03,
          morn: 29.03
        },
        feels_like: {
          day: 33.03,
          night: 20.25,
          eve: 23.29,
          morn: 23.65
        },
        pressure: 1023,
        humidity: 78,
        dew_point: 27.1,
        wind_speed: 7.76,
        wind_deg: 266,
        wind_gust: 13.82,
        weather: [
          {
            id: 600,
            main: 'Snow',
            description: 'light snow',
            icon: '13d'
          }
        ],
        clouds: 59,
        pop: 0.88,
        snow: 0.59,
        uvi: 1.34
      },
      {
        dt: 1675796400,
        sunrise: 1675781501,
        sunset: 1675817411,
        moonrise: 1675824960,
        moonset: 1675786020,
        moon_phase: 0.56,
        temp: {
          day: 36.7,
          min: 23.68,
          max: 39.51,
          night: 34.63,
          eve: 33.76,
          morn: 23.86
        },
        feels_like: {
          day: 32.76,
          night: 29.73,
          eve: 29.61,
          morn: 18.12
        },
        pressure: 1025,
        humidity: 84,
        dew_point: 28.2,
        wind_speed: 5.7,
        wind_deg: 233,
        wind_gust: 13.38,
        weather: [
          {
            id: 601,
            main: 'Snow',
            description: 'snow',
            icon: '13d'
          }
        ],
        clouds: 81,
        pop: 0.79,
        snow: 2.81,
        uvi: 1.91
      },
      {
        dt: 1675882800,
        sunrise: 1675867818,
        sunset: 1675903902,
        moonrise: 1675915320,
        moonset: 1675873500,
        moon_phase: 0.59,
        temp: {
          day: 28.38,
          min: 19.38,
          max: 34.05,
          night: 19.38,
          eve: 28.9,
          morn: 24.01
        },
        feels_like: {
          day: 19.27,
          night: 13.59,
          eve: 21.88,
          morn: 15.93
        },
        pressure: 1027,
        humidity: 69,
        dew_point: 15.22,
        wind_speed: 11.77,
        wind_deg: 276,
        wind_gust: 31.7,
        weather: [
          {
            id: 600,
            main: 'Snow',
            description: 'light snow',
            icon: '13d'
          }
        ],
        clouds: 71,
        pop: 1,
        snow: 1.53,
        uvi: 1.64
      },
      {
        dt: 1675969200,
        sunrise: 1675954133,
        sunset: 1675990392,
        moonrise: 1676005680,
        moonset: 1675960860,
        moon_phase: 0.62,
        temp: {
          day: 26.55,
          min: 13.73,
          max: 34.77,
          night: 23.65,
          eve: 33.93,
          morn: 15.03
        },
        feels_like: {
          day: 20.44,
          night: 17.19,
          eve: 30.42,
          morn: 9.09
        },
        pressure: 1036,
        humidity: 69,
        dew_point: 13.5,
        wind_speed: 5.23,
        wind_deg: 165,
        wind_gust: 7.38,
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02d'
          }
        ],
        clouds: 16,
        pop: 0,
        uvi: 2.23
      },
      {
        dt: 1676055600,
        sunrise: 1676040447,
        sunset: 1676076882,
        moonrise: 1676096160,
        moonset: 1676048220,
        moon_phase: 0.66,
        temp: {
          day: 34.5,
          min: 21.79,
          max: 38.93,
          night: 24.67,
          eve: 33.98,
          morn: 22.24
        },
        feels_like: {
          day: 30.16,
          night: 18.95,
          eve: 28.96,
          morn: 15.71
        },
        pressure: 1018,
        humidity: 66,
        dew_point: 20.37,
        wind_speed: 5.53,
        wind_deg: 295,
        wind_gust: 8.03,
        weather: [
          {
            id: 600,
            main: 'Snow',
            description: 'light snow',
            icon: '13d'
          }
        ],
        clouds: 85,
        pop: 0.91,
        snow: 0.24,
        uvi: 3
      },
      {
        dt: 1676142000,
        sunrise: 1676126760,
        sunset: 1676163372,
        moonrise: 0,
        moonset: 1676135700,
        moon_phase: 0.69,
        temp: {
          day: 29.82,
          min: 21.04,
          max: 33.57,
          night: 21.58,
          eve: 31.41,
          morn: 21.25
        },
        feels_like: {
          day: 24.26,
          night: 15.1,
          eve: 24.89,
          morn: 15.4
        },
        pressure: 1020,
        humidity: 73,
        dew_point: 17.96,
        wind_speed: 8.03,
        wind_deg: 276,
        wind_gust: 17,
        weather: [
          {
            id: 600,
            main: 'Snow',
            description: 'light snow',
            icon: '13d'
          }
        ],
        clouds: 86,
        pop: 0.76,
        snow: 0.26,
        uvi: 3
      },
      {
        dt: 1676228400,
        sunrise: 1676213071,
        sunset: 1676249861,
        moonrise: 1676186760,
        moonset: 1676223300,
        moon_phase: 0.72,
        temp: {
          day: 31.89,
          min: 20.01,
          max: 37.56,
          night: 31.06,
          eve: 36.41,
          morn: 22.05
        },
        feels_like: {
          day: 27.25,
          night: 25.3,
          eve: 32.13,
          morn: 15.57
        },
        pressure: 1019,
        humidity: 78,
        dew_point: 21.6,
        wind_speed: 6.62,
        wind_deg: 254,
        wind_gust: 11.21,
        weather: [
          {
            id: 600,
            main: 'Snow',
            description: 'light snow',
            icon: '13d'
          }
        ],
        clouds: 100,
        snow: 0.25,
        pop: 0.83,
        uvi: 3
      }
    ]
  }
];

export const RAWLOCATIONS: Location[] = [
  {
    zip: '95630',
    coord: {
      lon: -121.1529,
      lat: 38.6709
    },
    weather: [
      {
        id: 803,
        main: 'Clouds',
        description: 'broken clouds',
        icon: '04d'
      }
    ],
    base: 'stations',
    main: {
      temp: 49.06,
      feels_like: 49.06,
      temp_min: 41.99,
      temp_max: 60.49,
      pressure: 1021,
      humidity: 71
    },
    visibility: 10000,
    wind: {
      speed: 1.99,
      deg: 113,
      gust: 3
    },
    clouds: {
      all: 75
    },
    dt: 1675530075,
    sys: {
      type: 2,
      id: 2006213,
      country: 'US',
      sunrise: 1675523268,
      sunset: 1675560554
    },
    timezone: -28800,
    id: 0,
    name: 'Folsom',
    cod: 200
  },
  {
    zip: '95678',
    coord: {
      lon: -121.2867,
      lat: 38.7609
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04d'
      }
    ],
    base: 'stations',
    main: {
      temp: 48.9,
      feels_like: 48.9,
      temp_min: 42.48,
      temp_max: 59.29,
      pressure: 1021,
      humidity: 80
    },
    visibility: 10000,
    wind: {
      speed: 1.99,
      deg: 113,
      gust: 3
    },
    clouds: {
      all: 100
    },
    dt: 1675530573,
    sys: {
      type: 2,
      id: 2037770,
      country: 'US',
      sunrise: 1675523310,
      sunset: 1675560576
    },
    timezone: -28800,
    id: 0,
    name: 'Roseville',
    cod: 200
  },
  {
    zip: '95742',
    coord: {
      lon: -121.2153,
      lat: 38.5981
    },
    weather: [
      {
        id: 803,
        main: 'Clouds',
        description: 'broken clouds',
        icon: '04d'
      }
    ],
    base: 'stations',
    main: {
      temp: 48.76,
      feels_like: 48.76,
      temp_min: 42.46,
      temp_max: 60.21,
      pressure: 1022,
      humidity: 75
    },
    visibility: 10000,
    wind: {
      speed: 0,
      deg: 0
    },
    clouds: {
      all: 75
    },
    dt: 1675531077,
    sys: {
      type: 2,
      id: 2003165,
      country: 'US',
      sunrise: 1675523275,
      sunset: 1675560577
    },
    timezone: -28800,
    id: 0,
    name: 'Rancho Cordova',
    cod: 200
  },
  {
    zip: '55121',
    coord: {
      lon: -93.1543,
      lat: 44.8471
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04d'
      }
    ],
    base: 'stations',
    main: {
      temp: 19.51,
      feels_like: 9.59,
      temp_min: 16.92,
      temp_max: 22.86,
      pressure: 1011,
      humidity: 68
    },
    visibility: 10000,
    wind: {
      speed: 8.05,
      deg: 150
    },
    clouds: {
      all: 100
    },
    dt: 1675531205,
    sys: {
      type: 2,
      id: 2073150,
      country: 'US',
      sunrise: 1675517327,
      sunset: 1675553054
    },
    timezone: -21600,
    id: 0,
    name: 'Saint Paul',
    cod: 200
  },
  {
    zip: '30097',
    coord: {
      lon: -84.147,
      lat: 34.026
    },
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d'
      }
    ],
    base: 'stations',
    main: {
      temp: 42.82,
      feels_like: 39.27,
      temp_min: 39.72,
      temp_max: 47.03,
      pressure: 1034,
      humidity: 43
    },
    visibility: 10000,
    wind: {
      speed: 5.75,
      deg: 0
    },
    clouds: {
      all: 0
    },
    dt: 1675531249,
    sys: {
      type: 2,
      id: 2038353,
      country: 'US',
      sunrise: 1675513897,
      sunset: 1675552161
    },
    timezone: -18000,
    id: 0,
    name: 'Duluth',
    cod: 200
  },
  {
    zip: '30384',
    coord: {
      lon: -84.4741,
      lat: 33.8444
    },
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d'
      }
    ],
    base: 'stations',
    main: {
      temp: 44.49,
      feels_like: 41.25,
      temp_min: 41.72,
      temp_max: 48.61,
      pressure: 1035,
      humidity: 40
    },
    visibility: 10000,
    wind: {
      speed: 5.75,
      deg: 120
    },
    clouds: {
      all: 0
    },
    dt: 1675531243,
    sys: {
      type: 2,
      id: 2026003,
      country: 'US',
      sunrise: 1675513957,
      sunset: 1675552258
    },
    timezone: -18000,
    id: 0,
    name: 'Atlanta',
    cod: 200
  },
  {
    zip: '33035',
    coord: {
      lon: -80.4572,
      lat: 25.4573
    },
    weather: [
      {
        id: 500,
        main: 'Rain',
        description: 'light rain',
        icon: '10d'
      }
    ],
    base: 'stations',
    main: {
      temp: 74.79,
      feels_like: 75.58,
      temp_min: 73.02,
      temp_max: 77.02,
      pressure: 1023,
      humidity: 77
    },
    visibility: 10000,
    wind: {
      speed: 23.02,
      deg: 40
    },
    rain: {
      '1h': 0.65
    },
    clouds: {
      all: 100
    },
    dt: 1675531471,
    sys: {
      type: 2,
      id: 2005115,
      country: 'US',
      sunrise: 1675512225,
      sunset: 1675552061
    },
    timezone: -18000,
    id: 0,
    name: 'Homestead',
    cod: 200
  },
  {
    zip: '83616',
    coord: {
      lon: -116.362,
      lat: 43.7069
    },
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d'
      }
    ],
    base: 'stations',
    main: {
      temp: 31.77,
      feels_like: 28.45,
      temp_min: 28.18,
      temp_max: 34.65,
      pressure: 1024,
      humidity: 80
    },
    visibility: 10000,
    wind: {
      speed: 3.44,
      deg: 140
    },
    clouds: {
      all: 0
    },
    dt: 1675531109,
    sys: {
      type: 2,
      id: 2017548,
      country: 'US',
      sunrise: 1675522737,
      sunset: 1675558785
    },
    timezone: -25200,
    id: 0,
    name: 'Eagle',
    cod: 200
  },
  {
    zip: '59829',
    coord: {
      lon: -114.1938,
      lat: 46.028
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04d'
      }
    ],
    base: 'stations',
    main: {
      temp: 35.74,
      feels_like: 31.51,
      temp_min: 35.74,
      temp_max: 35.74,
      pressure: 1021,
      humidity: 83
    },
    visibility: 10000,
    wind: {
      speed: 4.94,
      deg: 197,
      gust: 8.7
    },
    clouds: {
      all: 87
    },
    dt: 1675533713,
    sys: {
      country: 'US',
      sunrise: 1675522540,
      sunset: 1675557941
    },
    timezone: -25200,
    id: 0,
    name: 'Darby',
    cod: 200
  }
  ];


