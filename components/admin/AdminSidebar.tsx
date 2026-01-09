"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  History,
  LogOut,
  Trash2,
} from "lucide-react";
import Image from "next/image";

const MENU_ITEMS = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  {
    name: "Manajemen Rekomendasi",
    href: "/admin/recommendations",
    icon: FileText,
  },
  { name: "Riwayat Deteksi", href: "/admin/history", icon: History },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b">
        <div className="flex items-center gap-2 font-bold text-xl text-green-700">
          <Image
            src="/favicon.ico"
            alt="logo aplikasi"
            width={50}
            height={50}
          />
          <span>PilahPintar</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-green-50 text-green-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          Keluar
        </button>
      </div>
    </div>
  );
}
