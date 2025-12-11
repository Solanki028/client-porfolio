import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Brand Portfolio",
  description: "Creative Design Portfolio",
};

import LayoutWrapper from "@/components/LayoutWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col bg-brand-black text-brand-text`} suppressHydrationWarning={true}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
