import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (Fixed Width) */}
      <aside className="w-64 fixed inset-y-0 left-0 z-50 hidden md:block border-r bg-white shadow-sm">
        <AdminSidebar />
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Header (Sticky Top) */}
        <AdminHeader />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
