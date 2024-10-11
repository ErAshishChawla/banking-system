import type { Metadata } from "next";
import "./globals.css";
import { ibmPlexSerif, inter } from "@/lib/font";

export const metadata: Metadata = {
  title: "Horizon",
  description:
    "Horizon is a modern banking platform. Manage your finances at your fingertips.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ibmPlexSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
