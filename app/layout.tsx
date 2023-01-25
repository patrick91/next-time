import { Links } from "@/components/links";
import "./globals.css";

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
      <body className="grid items-center justify-center min-h-screen bg-gray-50">
        <div className="space-y-24 p-4">
          {children}

          <Links />
        </div>
      </body>
    </html>
  );
}
