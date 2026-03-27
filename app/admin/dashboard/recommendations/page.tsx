import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil } from "lucide-react";
import Link from "next/link";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { SearchInput } from "@/components/admin/SearchInput";

type Props = {
  searchParams: Promise<{ query?: string }>;
};

export default async function RecommendationsPage(props: Props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  const dataKategori = await prisma.kategori.findMany({
    where: {
      OR: [
        { nama_alias: { contains: query } },
        { jenis_material: { contains: query } },
        { label_kelas: { contains: query } },
      ],
    },
    orderBy: { id_kategori: "asc" },
  });

  return (
    <div className="space-y-6 p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Manajemen Rekomendasi
          </h1>
          <p className="text-sm text-gray-500">
            Kelola data kategori sampah dan panduan daur ulang.
          </p>
        </div>

        <Link href="/admin/dashboard/create">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" /> Tambah Data
          </Button>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border flex gap-4">
        <SearchInput />
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-12.5">No</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Jenis Material</TableHead>
              <TableHead>Nilai Jual</TableHead>
              <TableHead>Label YOLO</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataKategori.map((item, index) => (
              <TableRow key={item.id_kategori}>
                <TableCell className="font-medium">{index + 1}</TableCell>

                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold 
                    ${
                      item.label_kelas.includes("plastic")
                        ? "bg-blue-100 text-blue-700"
                        : item.label_kelas.includes("paper")
                        ? "bg-yellow-100 text-yellow-700"
                        : item.label_kelas.includes("metal")
                        ? "bg-gray-100 text-gray-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.nama_alias}
                  </span>
                </TableCell>

                <TableCell>{item.jenis_material}</TableCell>
                <TableCell className="font-medium">
                  Rp {item.nilai_jual?.toString()}
                </TableCell>
                <TableCell className="text-gray-500 font-mono text-xs">
                  {item.label_kelas}
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/dashboard/${item.id_kategori}`}>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </Link>

                    <DeleteButton
                      id={item.id_kategori}
                      title={item.nama_alias}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {dataKategori.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center h-24 text-gray-500"
                >
                  {query
                    ? `Tidak ditemukan data untuk pencarian "${query}"`
                    : "Belum ada data."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
