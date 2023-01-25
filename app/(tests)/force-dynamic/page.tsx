import { Now } from "@/components/now";

export const dynamic = "force-dynamic";

export default async function ForceDynamic() {
  return (
    <>
      <h1 className="text-4xl font-bold text-center underline">Force dynamic</h1>
      <Now />
    </>
  );
}
