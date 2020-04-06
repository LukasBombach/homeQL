import { gql } from "apollo-server-micro";
import getWeather from "./lib";

export const typeDefs = gql`
  type Weather {
    observation_time: String!
    temperature: Float!
    weather_code: Float!
    weather_icons: [String!]!
    weather_descriptions: [String!]!
    wind_speed: Float!
    wind_degree: Float!
    wind_dir: String!
    pressure: Float!
    precip: Float!
    humidity: Float!
    cloudcover: Float!
    feelslike: Float!
    uv_index: Float!
    visibility: Float!
    is_day: String!
  }
`;

export async function resolve(location: string) {
  return await getWeather(location);
}

export async function subscribe(listener: (location: string) => void) {}

export async function ubsubscribe(listener: (location: string) => void) {}
