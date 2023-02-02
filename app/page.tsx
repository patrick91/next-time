import { Links } from "@/components/links";
import { Now } from "@/components/now";
import { getClient } from "@/lib/client";
import Script from "next/script";

export default async function Home() {
  const app = (
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

  const client = getClient();
  const state = client.cache.extract();

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script
        strategy="beforeInteractive"
        id="apollo-cache"
        dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
            /</g,
            "\\u003c"
          )};`,
        }}
      />
      {app}
    </>
  );
}
