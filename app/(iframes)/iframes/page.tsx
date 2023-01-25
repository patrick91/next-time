"use client";

import { useRef, useEffect } from "react";

function useInterval(callback: () => void, delay: number) {
  const intervalRef = useRef<null | number>(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === "number") {
      intervalRef.current = window.setInterval(tick, delay);
      return () => window.clearInterval(intervalRef.current!);
    }
  }, [delay]);

  return intervalRef;
}

export default function Iframes() {
  useInterval(() => {
    const iframes = document.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      iframe.contentWindow?.location.reload();
    });
  }, 2000);

  return (
    <div className="flex justify-around p-4 h-screen space-x-12">
      <iframe className="h-full flex-1 border-2" src="/" />
      <iframe className="h-full flex-1 border-2" src="/force-static" />
      <iframe className="h-full flex-1 border-2" src="/force-dynamic" />
    </div>
  );
}
