import "@/styles/globals.css";
import { NextProvider, NextLayout } from "./providers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "next-popular-spot-map",
  description: "Next.js를 이용한 맛집 앱",
  openGraph: {
    title: "next-popular-spot-map",
    description: "Next.js를 이용한 맛집 앱",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
