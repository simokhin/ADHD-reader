import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Read Text App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
