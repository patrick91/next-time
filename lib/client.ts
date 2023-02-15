import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

let client: ApolloClient<any> | null = null;

export const getClient = () => {
  if (!client) {
    let defaultOptions = {};

    if (typeof window === "undefined") {
      // don't use
      defaultOptions = {
        watchQuery: {
          fetchPolicy: "no-cache",
          errorPolicy: "ignore",
        },
        query: {
          fetchPolicy: "no-cache",
          errorPolicy: "all",
        },
      };
    }

    client = new ApolloClient({
      ssrMode: typeof window === "undefined",
      link: new HttpLink({
        uri: "https://main--time-pav6zq.apollographos.net/graphql",
      }),
      cache: new InMemoryCache(),
      defaultOptions,
    });
  }

  return client;
};
