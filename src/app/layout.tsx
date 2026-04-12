import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "G1 Networks - 수입차 부품 공식 판매점",
  description: "인증 정식 수입차 부품을 최저가로 만나보세요. Brembo, TRW, MANN-FILTER, ZF",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${noto.variable} antialiased`}>
      <body className="min-h-screen flex flex-col" style={{ fontFamily: "var(--font-noto), 'Noto Sans KR', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
