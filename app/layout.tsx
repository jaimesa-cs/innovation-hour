import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import SelectPage from "@/components/SelectPage";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Innovation Hour",
  description: "Generated by Jaime Santos Alcon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SelectPage />
        {children}
      </body>
    </html>
  );
}
