import { ApolloServer } from "apollo-server-micro";
import { merge } from "lodash";
import * as weather from "../../api/weather";

const Query = `
  type Query {
    _empty: String
  }
`;

const typeDefs = [Query, weather.typeDefs];
const resolvers = merge({}, weather.resolvers);

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
