import "./globals.css";
import { Inter, Outfit } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "Brand Portfolio",
  description: "Creative Design Portfolio",
};

import LayoutWrapper from "@/components/LayoutWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} antialiased min-h-screen flex flex-col bg-brand-black text-brand-text`} suppressHydrationWarning={true}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
