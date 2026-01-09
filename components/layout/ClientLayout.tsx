"use client"; // Wajib gunakan ini karena kita pakai hooks

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Daftar halaman yang TIDAK ingin menampilkan Navbar & Footer
  const disableNavbarFooter = ["/login", "/register"];

  // Cek apakah pathname saat ini ada di daftar disable
  // Jika path adalah "/login", hasilnya true
  const isDisabled = disableNavbarFooter.includes(pathname);

  return (
    <>
      {/* Tampilkan Navbar jika TIDAK disabled */}
      {!isDisabled && <Navbar />}

      <main className="min-h-screen">{children}</main>

      {/* Tampilkan Footer jika TIDAK disabled */}
      {!isDisabled && <Footer />}
    </>
  );
}
