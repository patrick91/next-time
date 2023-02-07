import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  ssrMode: true,
  link: new HttpLink({
    uri: "https://main--time-pav6zq.apollographos.net/graphql",
  }),
});

export const clientNoCache = new ApolloClient({
  cache: new InMemoryCache(),
  ssrMode: true,
  link: new HttpLink({
    uri: "https://main--time-pav6zq.apollographos.net/graphql",
  }),

  // disable apollo cache on server, but keep it on client
  defaultOptions: {
    watchQuery: {
      fetchPolicy: typeof window === "undefined" ? "no-cache" : undefined,
      errorPolicy: typeof window === "undefined" ? "ignore" : undefined,
    },
    query: {
      fetchPolicy: typeof window === "undefined" ? "no-cache" : undefined,
      errorPolicy: typeof window === "undefined" ? "all" : undefined,
    },
  },
});
