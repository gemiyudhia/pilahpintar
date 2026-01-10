import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { WasteDistributionChart } from "@/components/admin/WasteDistributionChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ScanLine, FileBox, ArrowUpRight } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // Ambil session di server
  const session = await getServerSession(authOptions);

  // Jika session null (belum login), tendang (Double protection selain middleware)
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      {/* 1. KARTU STATISTIK (Tetap sama) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Deteksi"
          value="1,248"
          icon={ScanLine}
          trend="+12% bulan ini"
        />
        <StatsCard
          title="Kategori Sampah"
          value="5"
          icon={FileBox}
          subtext="Plastik, Kertas, Logam, Kaca, Organik"
        />
        <StatsCard
          title="Total Pengguna"
          value="843"
          icon={Users}
          trend="+5 barusaja"
        />
      </div>

      {/* 2. AREA CHART & LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kiri: PIE CHART BARU */}
        <div className="lg:col-span-1">
          <WasteDistributionChart />
        </div>

        {/* Kanan: Recent Activity List (Tetap sama) */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">
              Deteksi Terpopuler Hari Ini
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg border flex items-center justify-center">
                      <FileBox className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">
                        Botol Plastik PET
                      </p>
                      <p className="text-sm text-gray-500">
                        Terdeteksi 124 kali
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-green-600">
                      Akurasi Rata-rata
                    </span>
                    <p className="font-mono text-gray-700">94.2%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ... (Pastikan fungsi StatsCard ada di bawah sini atau di file terpisah) ...
function StatsCard({ title, value, icon: Icon, trend, subtext }: any) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="p-2 bg-green-50 rounded-lg text-green-600">
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
          {trend && (
            <div className="flex items-center text-sm text-green-600 font-medium">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              {trend}
            </div>
          )}
        </div>
        {subtext && <p className="text-xs text-gray-400 mt-2">{subtext}</p>}
      </CardContent>
    </Card>
  );
}
