import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Pencil, Trash } from "lucide-react";

// Dummy Data
const RECOMMENDATIONS = [
  {
    id: 1,
    category: "Plastik",
    material: "PET (Polyethylene Terephthalate)",
    value: "Rp 3.000/kg",
    updated: "2025-10-12",
  },
  {
    id: 2,
    category: "Kertas",
    material: "Kardus Bekas (Corrugated)",
    value: "Rp 1.500/kg",
    updated: "2025-10-11",
  },
  {
    id: 3,
    category: "Logam",
    material: "Kaleng Aluminium",
    value: "Rp 12.000/kg",
    updated: "2025-10-10",
  },
  {
    id: 4,
    category: "Kaca",
    material: "Botol Kaca Bening",
    value: "Rp 500/kg",
    updated: "2025-10-09",
  },
];

export default function RecommendationsPage() {
  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Manajemen Rekomendasi
          </h1>
          <p className="text-sm text-gray-500">
            Kelola data kategori sampah dan panduan daur ulang.
          </p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" /> Tambah Data
        </Button>
      </div>

      {/* FILTER & SEARCH */}
      <div className="bg-white p-4 rounded-xl shadow-sm border flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Cari material atau kategori..."
            className="pl-10"
          />
        </div>
      </div>

      {/* TABLE SECTION (Gambar 3.15) */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-12.5">No</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Jenis Material</TableHead>
              <TableHead>Nilai Jual</TableHead>
              <TableHead>Terakhir Update</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {RECOMMENDATIONS.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold 
                    ${
                      item.category === "Plastik"
                        ? "bg-blue-100 text-blue-700"
                        : item.category === "Kertas"
                        ? "bg-yellow-100 text-yellow-700"
                        : item.category === "Logam"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.category}
                  </span>
                </TableCell>
                <TableCell>{item.material}</TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell className="text-gray-500">{item.updated}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
