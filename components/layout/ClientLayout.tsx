"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 1. Logika Exact Match (Cocok Sempurna)
  // Gunakan ini untuk halaman statis seperti Login/Register
  const exactDisabledRoutes = ["/login", "/register"];
  const isAuthPage = exactDisabledRoutes.includes(pathname);

  // 2. Logika Prefix Match (Awalan)
  // Gunakan ini untuk Route Dinamis (semua yang ada di dalam folder admin dashboard)
  // Ini akan menangkap:
  // - /admin/dashboard
  // - /admin/dashboard/create
  // - /admin/dashboard/123 (Edit)
  // - /admin/dashboard/settings/profile
  const isAdminPage = pathname.startsWith("/admin/dashboard");

  // Gabungkan kedua logika
  const shouldHideNavbarFooter = isAuthPage || isAdminPage;

  return (
    <>
      {/* Tampilkan Navbar jika TIDAK disembunyikan */}
      {!shouldHideNavbarFooter && <Navbar />}

      <main className="min-h-screen">{children}</main>

      {/* Tampilkan Footer jika TIDAK disembunyikan */}
      {!shouldHideNavbarFooter && <Footer />}
    </>
  );
}
