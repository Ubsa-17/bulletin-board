import type { Metadata } from "next";
import "./globals.css";

import { Noto_Sans_JP } from "next/font/google";

const noto_sans_jp = Noto_Sans_JP();

export const metadata: Metadata = {
  title: "掲示板アプリ",
  description: "Next.jsで作った掲示板アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${noto_sans_jp.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
