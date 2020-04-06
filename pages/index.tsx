import gql from "graphql-tag";

import { useQuery } from "@apollo/react-hooks";
import withData from "../lib/apollo";

interface NetworkError {
  result: { errors: Array<{ message: string }> };
}

const GET_WEAHTHER = gql`
  query weather {
    weather(query: "Berlin, Germany") {
      temperature
    }
  }
`;

const Index = () => {
  const { loading, error, data } = useQuery(GET_WEAHTHER);
  if (loading) return <p>Loading ...</p>;
  if (error) {
    const networkError: NetworkError = error.networkError as any;
    return networkError.result.errors.map((e, i) => (
      <pre key={i}>Error: {e.message}</pre>
    ));
  }
  return <h1>It's {data.weather.temperature}°C!</h1>;
};

export default withData(Index);
