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

// Dummy Data Riwayat
const HISTORY_DATA = [
  {
    id: "TRX-001",
    user: "Budi Santoso",
    image:
      "https://images.unsplash.com/photo-1596131398982-89647265a6f2?q=80&w=100&auto=format&fit=crop",
    result: "Botol Plastik (PET)",
    confidence: 98,
    date: "12 Okt 2025, 10:30",
    status: "success",
  },
  {
    id: "TRX-002",
    user: "Siti Aminah",
    image:
      "https://images.unsplash.com/photo-1605600659908-0ef719419d41?q=80&w=100&auto=format&fit=crop",
    result: "Kaleng Soda",
    confidence: 92,
    date: "12 Okt 2025, 11:15",
    status: "success",
  },
  {
    id: "TRX-003",
    user: "Anonim",
    image:
      "https://images.unsplash.com/photo-1591871937573-74dbba515c4c?q=80&w=100&auto=format&fit=crop",
    result: "Tidak Terdeteksi",
    confidence: 15,
    date: "11 Okt 2025, 09:20",
    status: "failed",
  },
  {
    id: "TRX-004",
    user: "Rudi Hartono",
    image:
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=100&auto=format&fit=crop",
    result: "Kardus Bekas",
    confidence: 89,
    date: "10 Okt 2025, 14:45",
    status: "success",
  },
  {
    id: "TRX-005",
    user: "Dewi Lestari",
    image:
      "https://images.unsplash.com/photo-1596131398982-89647265a6f2?q=80&w=100&auto=format&fit=crop",
    result: "Botol Plastik",
    confidence: 95,
    date: "10 Okt 2025, 16:00",
    status: "success",
  },
];

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Riwayat Deteksi</h1>
          <p className="text-sm text-gray-500">
            Daftar semua aktivitas pemindaian sampah oleh pengguna.
          </p>
        </div>
        <Button
          variant="outline"
          className="border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      {/* 2. Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Cari ID Transaksi atau Nama User..."
            className="pl-10 border-gray-200"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" /> Filter Tanggal
        </Button>
      </div>

      {/* 3. Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-25">ID</TableHead>
              <TableHead>Citra Sampah</TableHead>
              <TableHead>Pengguna</TableHead>
              <TableHead>Hasil Deteksi</TableHead>
              <TableHead>Akurasi</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {HISTORY_DATA.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-50/50">
                <TableCell className="font-mono text-xs font-medium text-gray-500">
                  {item.id}
                </TableCell>
                <TableCell>
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={item.image}
                      alt="Thumbnail"
                      fill
                      className="object-cover"
                      unoptimized // Agar tidak error domain Unsplash
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium text-gray-700">
                  {item.user}
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-gray-900">
                    {item.result}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`font-bold ${
                      item.confidence > 80
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {item.confidence}%
                  </span>
                </TableCell>
                <TableCell className="text-gray-500 text-sm">
                  {item.date}
                </TableCell>
                <TableCell>
                  {item.status === "success" ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0 shadow-none">
                      Berhasil
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-0 shadow-none">
                      Gagal
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
            ))}
          </TableBody>
        </Table>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-sm text-gray-500">
          <span>Menampilkan 1-5 dari 128 data</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Sebelumnya
            </Button>
            <Button variant="outline" size="sm">
              Selanjutnya
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
