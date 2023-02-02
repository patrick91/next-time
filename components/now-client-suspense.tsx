"use client";

import { getClient } from "@/lib/client";
import {
  ApolloProvider,
  SuspenseCache,
  useMutation,
  useSuspenseQuery_experimental,
} from "@apollo/client";
import { format } from "date-fns";
import { Suspense } from "react";
import { mutation, query } from "./operations";

const suspenseCache = new SuspenseCache();

const UpdateTimeButton = () => {
  const client = getClient();
  const [updateTime, { loading, error }] = useMutation(mutation, {
    client,
  });

  return (
    <button
      className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded text-sm disabled:bg-slate-300"
      disabled={loading}
      onClick={() => {
        updateTime({
          variables: {
            id: "1",
            note: "Updated at " + new Date().toISOString(),
          },
        });
      }}
    >
      Update time with note
    </button>
  );
};

export const Now = () => {
  const { data } = useSuspenseQuery_experimental(query);

  return (
    <>
      <dt className="font-bold mb-4 relative">
        <span className="bg-green-500 font-bold text-white rounded-3xl px-2 text-sm absolute right-full mr-2 mt-2">
          client
        </span>{" "}
        Now via Apollo (suspense)
      </dt>

      <dd className="tabular-nums text-right">
        <div suppressHydrationWarning>
          {format(new Date(data?.currentTime.now), "HH:mm:ss.SSS")}
        </div>
        <div className="text-xs">Note: {data?.currentTime.note}</div>
        <UpdateTimeButton />
      </dd>
    </>
  );
};

const Loading = () => {
  return <div>Loading...</div>;
};

export const NowApolloClientSuspense = () => {
  const client = getClient();

  return (
    <ApolloProvider client={client} suspenseCache={suspenseCache}>
      <Suspense fallback={<Loading />}>
        <Now />
      </Suspense>
    </ApolloProvider>
  );
};
