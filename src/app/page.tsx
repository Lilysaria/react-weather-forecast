'use client';

import Navbar from '@/components/Navbar';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import Container from '@/components/Container';
import { convertKelvinToCelsius } from '@/utils/convertKelvinToCelcius';

type WeatherData = {
  cod: string;
  message: number;
  cnt: number;
  list: Forecast[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

type Forecast = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: Weather[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  visibility: number;
  pop: number;
  rain?: {
    '3h': number;
  };
  snow?: {
    '3h': number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
};

type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>({
    queryKey: ['repoData'],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=London&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data;
    },
  });

  const firstData = data?.list[0];

  console.log('data', data?.city.name); // log data to see its structure

  if (isLoading)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce"> Loading...</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7x1 mx-auto flex flex-col gap-9 w-full pb-0 pt-4">
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2x1 items-end "></h2>
            <p>{format(parseISO(firstData?.dt_txt ?? ''), 'EEEE')}</p>
            <p className="text-lg">
              {format(parseISO(firstData?.dt_txt ?? ''), 'dd.MM.yyyy')}
            </p>
            <Container className="gap-10 px-6 items-center">
              {/* temperate */}
              <div className="flex flex-col px-4">
                <span className="text-5x1">
                  {convertKelvinToCelsius(firstData?.main.temp ?? 296.37)}°
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap"></p>
                <p className="text-xs space-x-2">
                  <span>
                    {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}° °↓{' '}
                  </span>
                  <span>
                    {' '}
                    {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}
                    °↑
                  </span>
                </p>
              </div>
              {/* time and  weather icon */}
              <div className="flex gap-10 sm-gap-16 overflow-x-auto w-full justify-content pr-3">
                {data?.list.map((d, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-between gap-2 items-center text-xs
  font-semibold"
                  >
                    <p>{format(parseISO(d.dt_txt), 'h:mm a')}</p>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        </section>

        {/* 7 dats forecast data */}
        <section></section>
      </main>
    </div>
  );
}
