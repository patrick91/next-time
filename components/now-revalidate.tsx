import { NowApolloRevalidate, NowGETRevalidate } from "./now";

export const NowRevalidate = () => {
  return (
    <dl className="text-2xl grid grid-cols-2 gap-4">
      {/* @ts-expect-error Server Component */}
      <NowGETRevalidate />
      {/* @ts-expect-error Server Component */}
      <NowApolloRevalidate />
    </dl>
  );
};
