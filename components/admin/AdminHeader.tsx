import { UserCircle } from "lucide-react";

export function AdminHeader() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-40">
      <h2 className="font-semibold text-gray-800">Panel Admin</h2>
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-gray-900">Administrator</p>
          <p className="text-xs text-gray-500">admin@pilahpintar.id</p>
        </div>
        <UserCircle className="w-9 h-9 text-gray-400" />
      </div>
    </header>
  );
}
