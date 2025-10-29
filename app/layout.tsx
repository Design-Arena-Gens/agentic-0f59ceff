import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "F STSC Department Overview",
  description: "Interactive presentation and PPT download for the F STSC Department."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
