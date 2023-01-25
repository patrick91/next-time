import { Links } from "@/components/links";
import { Now } from "@/components/now";

export const dynamic = "force-dynamic";

export default async function ForceDynamic() {
  return (
    <div className="grid items-center justify-center min-h-screen bg-gray-50">
      <div className="space-y-24 p-4">
        <h1 className="text-4xl font-bold text-center underline">
          Force dynamic
        </h1>
        <Now />

        <Links />
      </div>
    </div>
  );
}
