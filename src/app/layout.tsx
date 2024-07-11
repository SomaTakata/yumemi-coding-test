import { Inter } from "next/font/google";

import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "都道府県別人口推移可視化",
  description:
    "このプロジェクトは、ReactとHighchartsを使用して都道府県別人口推移を可視化します。APIからデータを取得し、都道府県を選択して人口推移を表示します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
