import { getClient } from "@/lib/apollo-next";
import { gql } from "@apollo/client";

import { NowApolloClient } from "./now-client";
import { NowApolloClientSuspense } from "./now-client-suspense";
import { ResultRow } from "./result-row";

const API_URL = "https://holy-waterfall-2142.fly.dev/";

const query = gql`
  query CurrentTime($id: ID!) {
    currentTime(id: $id) {
      id
      now
      note
    }
  }
`;

export const NowGET = async () => {
  const qs = new URLSearchParams();
  qs.append("query", query.loc!.source.body);
  qs.append("variables", JSON.stringify({ id: "1" }));

  const { data } = await fetch(API_URL + `?` + qs.toString()).then((res) => res.json());

  return (
    <ResultRow tags={["GET", "Server", "ID:1"]} text="Now via fetch" result={data.currentTime} />
  );
};

export const NowGETRevalidate = async () => {
  const qs = new URLSearchParams();
  qs.append("query", query.loc!.source.body);
  qs.append("variables", JSON.stringify({ id: "2" }));

  const { data } = await fetch(API_URL + `?` + qs.toString(), {
    next: {
      revalidate: 1,
    },
  }).then((res) => res.json());

  return (
    <ResultRow
      text="Now via fetch"
      tags={["GET", "Revalidate", "Server", "ID:2"]}
      result={data.currentTime}
    />
  );
};

export const NowPOST = async () => {
  const { data } = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query.loc!.source.body,
      variables: { id: "3" },
    }),
  }).then((res) => res.json());

  return (
    <ResultRow text="Now via fetch" tags={["POST", "Server", "ID:3"]} result={data.currentTime} />
  );
};

export const NowApollo = async () => {
  const client = getClient();

  const { data } = await client.query({
    query,
    variables: {
      id: "4",
    },
  });

  return (
    <ResultRow
      tags={["POST", "Apollo", "Server", "ID:4"]}
      text="Now via Apollo"
      result={data.currentTime}
    />
  );
};

export const NowApolloRevalidate = async () => {
  const client = getClient();

  const { data } = await client.query({
    query,
    variables: {
      id: "5",
    },
    context: {
      fetchOptions: {
        next: {
          revalidate: 1,
        },
      },
    },
  });

  return (
    <ResultRow
      tags={["POST", "Apollo", "Server", "Revalidate", "ID:5"]}
      text="Now via Apollo"
      result={data.currentTime}
    />
  );
};

export const Now = () => {
  return (
    <dl className="text-2xl grid grid-cols-2 gap-4">
      {/* @ts-expect-error Server Component */}
      <NowGET />
      {/* @ts-expect-error Server Component */}
      <NowPOST />
      {/* @ts-expect-error Server Component */}
      <NowApollo />

      <NowApolloClient />

      <NowApolloClientSuspense />
    </dl>
  );
};
