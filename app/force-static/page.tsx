import { Links } from "@/components/links";
import { Now } from "@/components/now";

export const dynamic = "force-static";

export default async function ForceStatic() {
  return (
    <div className="grid items-center justify-center min-h-screen bg-gray-50">
      <div className="space-y-24 p-4">
        <h1 className="text-4xl font-bold text-center underline">
          Force static
        </h1>
        <Now />

        <Links />
      </div>
    </div>
  );
}
