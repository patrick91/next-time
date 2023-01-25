import { Now } from "@/components/now";

export default async function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold text-center underline">Default behavior</h1>
      <Now />
    </>
  );
}
