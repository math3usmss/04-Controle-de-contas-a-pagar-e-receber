import "./globals.css";

import type { Metadata } from "next";

import AppProviders from "@/providers/AppProviders";

export const metadata: Metadata = {
  title: "Starter Next",
  description: "Starter Next",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="mx-12 my-6 flex min-h-full flex-col">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
