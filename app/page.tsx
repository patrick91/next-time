import { Links } from "@/components/links";
import { Now } from "@/components/now";

export default async function Home() {
  return (
    <div className="grid items-center justify-center min-h-screen bg-gray-50">
      <div className="space-y-24 p-4">
        <h1 className="text-4xl font-bold text-center underline">
          Default behavior
        </h1>
        <Now />

        <Links />
      </div>
    </div>
  );
}
