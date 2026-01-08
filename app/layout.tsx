import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "PilahSampah - sistem rekomendasi daur ulang",
  description:
    "Sistem Deteksi Untuk Memberikan Rekomendasi Daur Ulang Sampah Berbasis Machine Learning",
  icons: "favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased container mx-auto px-5`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
