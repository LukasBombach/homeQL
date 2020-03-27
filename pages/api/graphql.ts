import { ApolloServer, gql } from "apollo-server-micro";
import weatherstack from "../../api/weatherstack";

const typeDefs = gql`
  type Query {
    weather: Weather!
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

const resolvers = {
  Query: {
    weather: async () => await weatherstack("Berlin, Germany")
  }
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: "/api/graphql" });
