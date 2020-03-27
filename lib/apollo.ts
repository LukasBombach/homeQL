import { withData } from "next-apollo";
import { HttpLink } from "apollo-link-http";

const config = {
  link: new HttpLink({
    credentials: "same-origin",
    uri: "http://localhost:3000/api/graphql"
  })
};

export default withData(config);
