import fetch from "isomorphic-unfetch";
import cache from "../lib/cache";
import env from "../lib/env";

export default async function weatherstack(
  query: string
): Promise<Response["current"]> {
  const encodedQuery = encodeURIComponent(query);
  const data = await fetchWeatherstack(encodedQuery);
  return data.current;
}

function fetchWeatherstack(query: string): Promise<Response> {
  const accessKey = env("WEATHERSTACK_API_KEY");
  const apiEndpoint = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${query}`;
  const id = `weatherstack-${query}`;
  return cache.wrap(
    id,
    async () => {
      const response = await fetch(apiEndpoint);
      return await response.json();
    },
    { ttl: 10 }
  );
}

type Response = {
  request: {
    type: string;
    query: string;
    language: string;
    unit: string;
  };
  location: {
    name: string;
    country: string;
    region: string;
    lat: string;
    lon: string;
    timezone_id: string;
    localtime: string;
    localtime_epoch: number;
    utc_offset: string;
  };
  current: {
    observation_time: string;
    temperature: number;
    weather_code: number;
    weather_icons: string[];
    weather_descriptions: string[];
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    pressure: number;
    precip: number;
    humidity: number;
    cloudcover: number;
    feelslike: number;
    uv_index: number;
    visibility: number;
    is_day: string;
  };
};

type Error = {
  success: boolean;
  error: {
    code: number;
    type: string;
    info: string;
  };
};
