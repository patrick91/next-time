"use client";
// import this to trigger `registerApolloClient` before the components render
// there might be a better way of doing this, I'm not very familiar with next
import "@/lib/client";
import { getClient } from "@/lib/apollo-next";
import {
  ApolloProvider,
  gql,
  SuspenseCache,
  useMutation,
  useSuspenseQuery_experimental,
} from "@apollo/client";
import { format } from "date-fns";
import { Suspense } from "react";
import { Tag } from "./tag";

const suspenseCache = new SuspenseCache();

const query = gql`
  {
    currentTime(id: "1") {
      id
      now
      note
    }
  }
`;

const mutation = gql`
  mutation UpdateTime($id: ID!, $note: String!) {
    updateCurrentTime(id: $id, note: $note) {
      id
      now
      note
    }
  }
`;

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

  const tags = ["POST", "Apollo", "Client", "Suspense"];

  return (
    <>
      <dt className="font-bold mb-4">
        Now via Apollo
        <div>
          {tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>
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
