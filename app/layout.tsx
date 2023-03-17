import { Links } from "@/components/links";
import "./globals.css";

// import this to trigger `registerApolloClient` before the components render
// there might be a better way of doing this, I'm not very familiar with next
import "@/lib/client";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
