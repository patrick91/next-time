import clsx from "clsx";

export const Tag = ({ tag }: { tag: string }) => (
  <span
    className={clsx(
      "font-normal text-white rounded-3xl p-1 px-2 text-xs mr-2 bg-green-500",
      {
        "bg-red-400": tag.toLocaleLowerCase() === "server",
        "bg-blue-400": tag.toLocaleLowerCase() === "apollo",
        "bg-purple-400": tag.toLocaleLowerCase() === "post",
        "bg-yellow-400": tag.toLocaleLowerCase() === "suspense",
        "bg-pink-400": tag.toLocaleLowerCase() === "revalidate",
      }
    )}
  >
    {tag}
  </span>
);
