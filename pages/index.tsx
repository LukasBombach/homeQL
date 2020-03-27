import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import withData from "../lib/apollo";

const GET_WEAHTHER = gql`
  query weather {
    weather {
      temperature
    }
  }
`;

const Index = () => {
  const { loading, error, data } = useQuery(GET_WEAHTHER);
  if (loading) return <p>Loading ...</p>;
  return <h1>It's {data.weather.temperature}°C!</h1>;
};

export default withData(Index);
