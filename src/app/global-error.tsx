"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="w-full h-screen mx-auto pt-[10%] text-black text-center font-semibold">
          다시 시도해주세요
          <button
            onClick={() => reset()}
            className="mt-4 mx-auto bg-red-600 text-white px-4 py-2.5 rounded-md hover:bg-red-500"
          >
            Try again
          </button>
        </div>
      </body>tau
    </html>
  );
}
