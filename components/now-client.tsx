"use client";

import { client } from "@/lib/client";
import { gql, useMutation, useQuery } from "@apollo/client";
import { format } from "date-fns";

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

export const NowApolloClient = () => {
  const { loading, data, error } = useQuery(query, {
    client,
  });

  return (
    <>
      <dt className="font-bold mb-4 relative">
        <span className="bg-green-500 font-bold text-white rounded-3xl px-2 text-sm absolute right-full mr-2 mt-2">
          client
        </span>{" "}
        Now via Apollo
      </dt>
      {data?.currentTime ? (
        <dd className="tabular-nums text-right">
          <div>{format(new Date(data?.currentTime.now), "HH:mm:ss.SSS")}</div>
          <div className="text-xs">Note: {data?.currentTime.note}</div>
          <UpdateTimeButton />
        </dd>
      ) : (
        <dd className="text-right text-gray-500">Loading...</dd>
      )}
    </>
  );
};
