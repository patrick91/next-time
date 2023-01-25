import Link from "next/link";

export const Links = () => {
  return (
    <div className="flex flex-col text-center text-2xl space-y-4">
      <Link className="underline" href="/">Default behavior</Link>
      <Link className="underline" href="/force-dynamic">Force dynamic behavior</Link>
      <Link className="underline" href="/force-static">Force static behavior</Link>
    </div>
  );
};
