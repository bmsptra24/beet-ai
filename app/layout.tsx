import { bricolageGrotesque } from "@/styles/fonts";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Streamer AI",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${bricolageGrotesque.className} text-primary-black overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
