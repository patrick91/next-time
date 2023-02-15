"use client";

import { getClient } from "@/lib/client";
import { gql, useMutation, useQuery } from "@apollo/client";
import { format } from "date-fns";
import { Tag } from "./tag";

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

export const NowApolloClient = () => {
  const client = getClient();

  const { loading, data, error } = useQuery(query, {
    client,
  });

  const tags = ["POST", "Apollo", "Client"];

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
