import { client, clientNoCache } from "@/lib/client";
import { gql } from "@apollo/client";

const API_URL = "https://holy-waterfall-2142.fly.dev/";

const ResultRow = ({ text, result }: { text: string; result: string }) => (
  <tr>
    <td className="font-bold pr-12 pb-6">{text}</td>
    <td className="pb-6">{result}</td>
  </tr>
);

const NowGET = async () => {
  const { data } = await fetch(API_URL + `?query={now}`).then((res) =>
    res.json()
  );

  return <ResultRow text="Now via fetch (GET)" result={data.now} />;
};

const NowPOST = async () => {
  const { data } = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: "{now}" }),
  }).then((res) => res.json());

  return <ResultRow text="Now via fetch (POST)" result={data.now} />;
};

const query = gql`
  {
    now
  }
`;

const NowApollo = async () => {
  const { data } = await client.query({ query });

  return <ResultRow text="Now via Apollo" result={data.now} />;
};

const NowApolloNoCache = async () => {
  const { data } = await clientNoCache.query({ query });

  return <ResultRow text="Now via Apollo (no cache)" result={data.now} />;
};

export const Now = () => {
  return (
    <table className="text-3xl">
      {/* @ts-expect-error Server Component */}
      <NowGET />
      {/* @ts-expect-error Server Component */}
      <NowPOST />
      {/* @ts-expect-error Server Component */}
      <NowApollo />
      {/* @ts-expect-error Server Component */}
      <NowApolloNoCache />
    </table>
  );
};
