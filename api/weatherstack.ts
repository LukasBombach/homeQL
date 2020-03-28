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

async function fetchWeatherstack(query: string): Promise<Response> {
  const accessKey = env("WEATHERSTACK_API_KEY");
  const apiEndpoint = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${query}`;
  const id = `weatherstack-${query}`;
  return await fetchCached(id, apiEndpoint);
}

async function fetchCached(id: string, url: string) {
  return await cache.wrap(id, () => fetchJson(url), { ttl: 60 * 30 });
}

async function fetchJson(url: string) {
  const response = await fetch(url);
  return await response.json();
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
