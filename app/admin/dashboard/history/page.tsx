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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Download, Search, Eye, Filter } from "lucide-react";

// Agar data selalu fresh (tidak dicache statis)
export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  // 1. AMBIL DATA
  const logs = await prisma.logRiwayat.findMany({
    orderBy: { waktu_deteksi: "desc" },
    include: {
      kategori: true,
    },
  });

  return (
    <div className="space-y-6 p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Riwayat Deteksi</h1>
          <p className="text-sm text-gray-500">
            Monitoring aktivitas deteksi sampah (Storage: Cloudinary).
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Cari ID Riwayat..."
            className="pl-10 border-gray-200"
          />
        </div>
      </div>

      {/* Table Section */}
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

                  {/* --- BAGIAN GAMBAR CLOUDINARY --- */}
                  <TableCell>
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                      <Image
                        // Langsung pakai URL dari database karena sudah format HTTPS Cloudinary
                        src={item.lokasi_gambar}
                        alt={item.kategori.nama_alias}
                        fill
                        className="object-cover"
                        // Jika next.config.mjs sudah diatur, 'unoptimized' boleh dihapus biar lebih cepat
                        // unoptimized
                      />
                    </div>
                  </TableCell>

                  <TableCell className="font-medium text-gray-700">
                    {item.kategori.nama_alias}
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

            {logs.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-gray-500"
                >
                  Belum ada data riwayat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
