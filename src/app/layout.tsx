import type { Metadata } from "next";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-thai",
  subsets: ["thai"],
});

export const metadata: Metadata = {
  title: "ทริปศึกษาดูงานกรุงเทพฯ 2026 - แพลนเนอร์การเดินทาง",
  description: "วางแผนเส้นทางหลายตัวเลือก พร้อมสรุปค่าใช้จ่ายสำหรับทั้งกลุ่ม",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${inter.variable} ${notoSansThai.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
