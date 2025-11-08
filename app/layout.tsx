import type { Metadata } from "next";
import { Providers } from "./components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "TradeChampion - Prove Your Trading Skills",
  description: "Challenge friends, win crypto. Competitive trading platform for NFT holders.",
  openGraph: {
    title: "TradeChampion",
    description: "Prove your trading skills. Challenge friends, win crypto.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
