import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

let client: ApolloClient<any> | null = null;

export const getClient = () => {
  if (!client) {
    client = new ApolloClient({
      cache: new InMemoryCache(
        typeof window === "undefined"
          ? undefined
          : (window as any).__APOLLO_STATE__
      ),
      ssrMode: typeof window === "undefined",
      link: new HttpLink({
        uri: "https://holy-waterfall-2142.fly.dev/",
      }),
    });
  }

  return client;
};

export const clientNoCache = new ApolloClient({
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined",
  link: new HttpLink({
    uri: "https://holy-waterfall-2142.fly.dev/",
  }),

  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});
