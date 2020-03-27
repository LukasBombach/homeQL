import fetch from "isomorphic-unfetch";
import env from "../lib/env";

export default async function weatherstack(
  query: string
): Promise<Response["current"]> {
  const accessKey = env("WEATHERSTACK_API_KEY");
  const encodedQuery = encodeURIComponent(query);
  const apiEndpoint = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${encodedQuery}`;
  const response = await fetch(apiEndpoint);
  const data: Response = await response.json();
  return data.current;
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
