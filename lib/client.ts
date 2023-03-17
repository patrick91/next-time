import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { registerApolloClient } from "./apollo-next";

export function makeClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://main--time-pav6zq.apollographos.net/graphql",
    }),
    cache: new InMemoryCache(),
  });
}

registerApolloClient(makeClient);