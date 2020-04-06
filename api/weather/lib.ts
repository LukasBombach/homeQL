import fetch from "isomorphic-unfetch";
import cache from "../../lib/cache";
import env from "../../lib/env";
import { Response } from "./types";

export default async (query: string): Promise<Response["current"]> => {
  const encodedQuery = encodeURIComponent(query);
  const data = await fetchWeatherstack(encodedQuery);
  return data.current;
};

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
  console.log("loading weather");
  const response = await fetch(url);
  return await response.json();
}
