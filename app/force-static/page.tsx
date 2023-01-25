import { Now } from "@/components/now";

export const dynamic = "force-static";

export default async function ForceStatic() {
    return (
        <>
          <h1 className="text-4xl font-bold text-center underline">Force static</h1>
          <Now />
        </>
      );
    }
