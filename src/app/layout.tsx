import type { Metadata } from "next";
import "./globals.css";

import { Noto_Sans_JP } from "next/font/google";

import { LayoutWrapper } from "./components/layout/layout-wrapper";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Header } from "./components/layout/header";

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
    <html lang="ja" suppressHydrationWarning>
      <body className={`${noto_sans_jp.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutWrapper>
            <header>
              <Header />
            </header>
            <main>{children}</main>
          </LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
