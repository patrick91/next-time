import { client, clientNoCache } from "@/lib/client";
import { gql } from "@apollo/client";

import { NowApolloClient } from "./now-client";
import { NowApolloClientSuspense } from "./now-client-suspense";
import { ResultRow } from "./result-row";

const API_URL = "https://holy-waterfall-2142.fly.dev/";

const query = gql`
  {
    currentTime(id: "1") {
      id
      now
      note
    }
  }
`;

const NowGET = async () => {
  const qs = new URLSearchParams();
  qs.append("query", query.loc!.source.body);

  const { data } = await fetch(API_URL + `?` + qs.toString()).then((res) =>
    res.json()
  );

  return <ResultRow text="Now via fetch (GET)" result={data.currentTime} />;
};

const NowPOST = async () => {
  const { data } = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: query.loc!.source.body }),
  }).then((res) => res.json());

  return <ResultRow text="Now via fetch (POST)" result={data.currentTime} />;
};

const NowApollo = async () => {
  const { data } = await client.query({ query });

  return <ResultRow text="Now via Apollo" result={data.currentTime} />;
};

const NowApolloRevalidate = async () => {
  const { data } = await client.query({
    query,
    context: {
      fetchOptions: {
        next: { revalidate: 1 },
      },
    },
  });

  return (
    <ResultRow
      text="Now via Apollo (revalidates via fetch)"
      result={data.currentTime}
    />
  );
};

const NowApolloNoCache = async () => {
  const { data } = await clientNoCache.query({ query });

  return (
    <ResultRow text="Now via Apollo (no cache)" result={data.currentTime} />
  );
};

export const Now = () => {
  return (
    <dl className="text-3xl grid grid-cols-2 gap-4">
      {/* @ts-expect-error Server Component */}
      <NowGET />
      {/* @ts-expect-error Server Component */}
      <NowPOST />
      {/* @ts-expect-error Server Component */}
      <NowApollo />
      {/* @ts-expect-error Server Component */}
      <NowApolloNoCache />
      {/* @ts-expect-error Server Component */}
      <NowApolloRevalidate />

      <NowApolloClient />

      <NowApolloClientSuspense />
    </dl>
  );
};
