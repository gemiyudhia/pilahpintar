import { prisma } from "@/lib/prisma";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, Filter } from "lucide-react";
import { SearchInput } from "@/components/admin/SearchInput"; // Pastikan path ini benar (komponen yang kita buat sebelumnya)

export const dynamic = "force-dynamic";

// Definisikan tipe Props untuk menangkap URL params
type Props = {
  searchParams: Promise<{ query?: string }>;
};

export default async function HistoryPage(props: Props) {
  // 1. Ambil kata kunci pencarian dari URL
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  // 2. QUERY DATABASE DENGAN LOGIKA PENCARIAN CERDAS
  const logs = await prisma.logRiwayat.findMany({
    where: {
      // Kita cari berdasarkan RELASI ke tabel Kategori
      kategori: {
        OR: [
          // Cari jika Nama Tampilan mengandung kata kunci
          {
            nama_alias: {
              contains: query,
              // mode: "insensitive", // Uncomment jika pakai PostgreSQL. MySQL biasanya default case-insensitive
            },
          },
          // ATAU cari jika Label YOLO mengandung kata kunci
          {
            label_kelas: {
              contains: query,
            },
          },
          // ATAU cari jika Jenis Material mengandung kata kunci
          {
            jenis_material: {
              contains: query,
            },
          },
        ],
      },
    },
    orderBy: { waktu_deteksi: "desc" },
    include: {
      kategori: true,
    },
  });

  return (
    <div className="space-y-6 p-8">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Riwayat Deteksi</h1>
          <p className="text-sm text-gray-500">
            Monitoring aktivitas deteksi sampah yang masuk (Storage:
            Cloudinary).
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      {/* 2. Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        {/* GUNAKAN KOMPONEN SEARCH INPUT DISINI */}
        <SearchInput />

        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" /> Filter Tanggal
        </Button>
      </div>

      {/* 3. Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-20">ID</TableHead>
              <TableHead>Citra Sampah</TableHead>
              <TableHead>Hasil Deteksi</TableHead>
              <TableHead>Akurasi</TableHead>
              <TableHead>Waktu</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((item) => {
              const percentage = Math.round(item.skor_akurasi * 100);
              const isSuccess = percentage >= 50;

              // Format Tanggal Indonesia
              const formattedDate = new Date(item.waktu_deteksi).toLocaleString(
                "id-ID",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              );

              return (
                <TableRow key={item.id_riwayat} className="hover:bg-gray-50/50">
                  <TableCell className="font-mono text-xs font-medium text-gray-500">
                    #{item.id_riwayat}
                  </TableCell>

                  {/* Gambar Cloudinary */}
                  <TableCell>
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                      <Image
                        src={item.lokasi_gambar}
                        alt={item.kategori.nama_alias}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>

                  {/* Nama Alias (Ini yang dicari user) */}
                  <TableCell className="font-medium text-gray-700">
                    {item.kategori.nama_alias}
                    {/* Tampilkan label kecil dibawahnya */}
                    <div className="text-xs text-gray-400 font-mono mt-0.5">
                      {item.kategori.label_kelas}
                    </div>
                  </TableCell>

                  <TableCell>
                    <span
                      className={`font-bold ${
                        percentage > 80 ? "text-green-600" : "text-yellow-600"
                      }`}
                    >
                      {percentage}%
                    </span>
                  </TableCell>

                  <TableCell className="text-gray-500 text-sm">
                    {formattedDate} WIB
                  </TableCell>

                  <TableCell>
                    {isSuccess ? (
                      <Badge className="bg-green-100 text-green-700 border-0 shadow-none">
                        OK
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-700 border-0 shadow-none">
                        Low
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-gray-100 rounded-full"
                    >
                      <Eye className="w-4 h-4 text-gray-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}

            {/* State Kosong / Tidak Ditemukan */}
            {logs.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-12 text-gray-500"
                >
                  {query ? (
                    <span>
                      Tidak ditemukan riwayat sampah dengan kata kunci{" "}
                      <span className="font-bold text-gray-800">
                        &quot;{query}&quot;
                      </span>
                    </span>
                  ) : (
                    "Belum ada data riwayat."
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Footer (Info Jumlah) */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 text-sm text-gray-500">
          Menampilkan {logs.length} data riwayat.
        </div>
      </div>
    </div>
  );
}
