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
  const exactDisabledRoutes = ["/login", "/register"];
  const isAuthPage = exactDisabledRoutes.includes(pathname);

  const isAdminPage = pathname.startsWith("/admin/dashboard");
  const shouldHideNavbarFooter = isAuthPage || isAdminPage;

  return (
    <>
      {!shouldHideNavbarFooter && <Navbar />}
      <main className="min-h-screen">{children}</main>
      {!shouldHideNavbarFooter && <Footer />}
    </>
  );
}
