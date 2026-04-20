import RecommendationsClient from "@/components/admin/RecommendationsClient";
import { prisma } from "@/lib/prisma";
import { WifiOff, RefreshCw } from "lucide-react";

type Props = {
  searchParams: Promise<{ query?: string }>;
};

async function fetchRecommendationsData() {
  try {
    const [dataKategori, dataKerajinan] = await Promise.all([
      prisma.kategori.findMany({
        orderBy: { id_kategori: "asc" },
      }),
      prisma.kerajinan.findMany({
        orderBy: { id_kerajinan: "asc" },
        select: {
          id_kerajinan: true,
          nama_kerajinan: true,
          deskripsi: true,
          gambar_url: true,
          id_kategori: true,
          kategori: true,
        },
      }),
    ]);

    return { success: true as const, data: { dataKategori, dataKerajinan } };
  } catch (error: any) {
    console.error(
      "[RecommendationsPage] Gagal mengambil data:",
      error?.message ?? error,
    );

    const isCantReach =
      error?.message?.includes("Can't reach database") ||
      error?.message?.includes("ECONNREFUSED") ||
      error?.message?.includes("pooler");

    return {
      success: false as const,
      error: isCantReach
        ? "Tidak dapat terhubung ke server database. Pastikan koneksi database aktif."
        : "Terjadi kesalahan saat mengambil data rekomendasi.",
    };
  }
}

export default async function RecommendationsPage(props: Props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  const result = await fetchRecommendationsData();

  if (!result.success) {
    return (
      <div className="p-8">
        <DatabaseErrorBanner
          message={result.error}
          retryHref="/admin/dashboard/recommendations"
        />
      </div>
    );
  }

  const { dataKategori, dataKerajinan } = result.data;

  return (
    <RecommendationsClient
      dataKategori={dataKategori}
      dataKerajinan={dataKerajinan}
      query={query}
    />
  );
}

function DatabaseErrorBanner({
  message,
  retryHref,
}: {
  message: string;
  retryHref: string;
}) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-xl border border-red-200 bg-red-50 text-red-800">
      <WifiOff className="w-5 h-5 mt-0.5 shrink-0 text-red-500" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm">Koneksi Database Bermasalah</p>
        <p className="text-sm text-red-600 mt-0.5">{message}</p>
      </div>
      <a
        href={retryHref}
        className="flex items-center gap-1.5 text-sm font-medium text-red-700 hover:text-red-900 transition-colors shrink-0"
      >
        <RefreshCw className="w-4 h-4" />
        Coba Lagi
      </a>
    </div>
  );
}
