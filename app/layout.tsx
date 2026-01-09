import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
// Import ClientLayout yang baru dibuat
import ClientLayout from "@/components/layout/ClientLayout";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "PilahPintar - sistem rekomendasi daur ulang",
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
    <html className="scroll-smooth" lang="en">
      <body className={`${poppins.className} antialiased`}>
        {/* Gunakan ClientLayout sebagai pembungkus */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
