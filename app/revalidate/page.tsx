import { Links } from "@/components/links";
import { NowRevalidate } from "@/components/now-revalidate";

export default async function Revlaidate() {
  return (
    <div className="grid items-center justify-center min-h-screen bg-gray-50">
      <div className="space-y-12 p-4">
        <h1 className="text-4xl font-bold text-center underline">
          Default with revalidation on components
        </h1>
        <NowRevalidate />

        <Links />
      </div>
    </div>
  );
}
