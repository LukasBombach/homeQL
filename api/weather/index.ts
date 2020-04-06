import getWeather from "./lib";

export const typeDefs = `
  extend type Query {
    weather(query: String!): Weather
  }

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

export const resolvers = {
  Query: {
    weather: async (source, { query }) => {
      if (typeof query === "undefined")
        throw new Error("Missing Query Parameter");
      if (typeof query !== "string")
        throw new Error("Query Parameter must be a string");
      return getWeather(query);
    },
  },
};

/* 
export async function subscribe(listener: (location: string) => void) {}

export async function ubsubscribe(listener: (location: string) => void) {}
 */
