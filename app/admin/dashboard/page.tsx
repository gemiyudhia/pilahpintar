import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { WasteDistributionChart } from "@/components/admin/WasteDistributionChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScanLine, FileBox, ArrowUpRight, Activity } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

// Helper date
function getStartOfDay() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  // =========================================
  // 1. FETCH DATA
  // =========================================
  const [
    totalDeteksi,
    totalKategori,
    deteksiHariIni,
    topCategoriesStats,
    allCategoriesDistribution,
  ] = await Promise.all([
    // A. Total Semua
    prisma.logRiwayat.count(),

    // B. Total Kategori
    prisma.kategori.count(),

    // C. Hari Ini
    prisma.logRiwayat.count({
      where: { waktu_deteksi: { gte: getStartOfDay() } },
    }),

    // D. Top 3 List
    prisma.logRiwayat.groupBy({
      by: ["id_kategori"],
      _count: { id_kategori: true },
      _avg: { skor_akurasi: true },
      orderBy: { _count: { id_kategori: "desc" } },
      take: 3,
    }),

    // E. CHART DATA (PENTING: Gunakan include agar _count terbaca typescript)
    prisma.kategori.findMany({
      select: {
        // Gunakan select
        nama_alias: true,
        label_kelas: true,
        _count: {
          select: {
            log_riwayat: true, // Pastikan ini 'log_riwayat' (sesuai schema)
          },
        },
      },
    }),
  ]);

  // =========================================
  // 2. OLAH DATA UNTUK CHART
  // =========================================
  const chartData = allCategoriesDistribution
    .map((cat) => ({
      name: cat.nama_alias,
      value: (cat as any)._count.log_riwayat,
      label: cat.label_kelas,
    }))
    .filter((item) => item.value > 0);

  // =========================================
  // 3. OLAH DATA UNTUK TOP 3 LIST
  // =========================================
  const categoryDetails = await prisma.kategori.findMany({
    where: {
      id_kategori: {
        in: topCategoriesStats.map((i) => i.id_kategori) as number[],
      },
    },
  });

  const popularList = topCategoriesStats.map((stat) => {
    const detail = categoryDetails.find(
      (c) => c.id_kategori === stat.id_kategori
    );
    return {
      name: detail?.nama_alias || "Unknown",
      count: stat._count.id_kategori,
      avgAccuracy: (stat._avg.skor_akurasi || 0) * 100,
    };
  });

  return (
    <div className="space-y-6 p-8">
      {/* KARTU STATISTIK */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Deteksi"
          value={totalDeteksi.toLocaleString()}
          icon={ScanLine}
          trend="Semua Waktu"
        />
        <StatsCard
          title="Kategori Sampah"
          value={totalKategori.toString()}
          icon={FileBox}
          subtext="Jenis sampah terdaftar"
        />
        <StatsCard
          title="Deteksi Hari Ini"
          value={deteksiHariIni.toString()}
          icon={Activity}
          trend="Sejak 00:00 WIB"
        />
      </div>

      {/* CHART & LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          {/* Pastikan komponen ini menerima props 'data' */}
          <WasteDistributionChart data={chartData} />
        </div>

        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">
              3 Kategori Paling Sering Terdeteksi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularList.length > 0 ? (
                popularList.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-lg border flex items-center justify-center">
                        <FileBox className="text-green-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.count} kali
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-green-600">
                        Akurasi
                      </span>
                      <p className="font-mono text-gray-700">
                        {item.avgAccuracy.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">
                  Belum ada data.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper Component
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
