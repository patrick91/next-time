import { format } from "date-fns";

export const ResultRow = ({
  text,
  result,
}: {
  text: string;
  result?: {
    id: string;
    now: string;
    note: string;
  };
}) => (
  <>
    <dt className="font-bold mb-4">{text}</dt>
    {result ? (
      <dd className="tabular-nums text-right">
        <div>{format(new Date(result.now), "HH:mm:ss.SSS")}</div>
        <div className="text-xs">Note: {result.note}</div>
      </dd>
    ) : (
      <dd className="text-right text-gray-500">Loading...</dd>
    )}
  </>
);
