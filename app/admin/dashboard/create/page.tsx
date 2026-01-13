import { Button } from "@/components/ui/button";
import { createKategori } from "@/app/actions/actions"; // Pastikan import ini benar
import Link from "next/link";

export default function CreatePage() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Tambah Data Kategori Baru
        </h1>
        <Link
          href="/admin/dashboard"
          className="text-sm text-blue-600 hover:underline"
        >
          &larr; Kembali ke Dashboard
        </Link>
      </div>

      <form
        action={createKategori}
        className="space-y-6 bg-white p-6 border rounded-xl shadow-sm"
      >
        {/* 1. Label YOLO (Sangat Penting) */}
        <div className="bg-blue-50 p-4 rounded border border-blue-200">
          <label className="block text-sm font-bold text-blue-800 mb-1">
            Label Kelas (YOLO)
          </label>
          <input
            name="label_kelas"
            placeholder="Contoh: plastic, paper, metal..."
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
            required
          />
          <p className="text-xs text-blue-600 mt-1">
            *Wajib diisi huruf kecil semua, tanpa spasi. Harus sama persis
            dengan nama class saat training model AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 2. Nama Tampilan */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Nama Tampilan (User)
            </label>
            <input
              name="nama_alias"
              placeholder="Contoh: Botol Plastik"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          {/* 3. Jenis Material */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Jenis Material
            </label>
            <input
              name="jenis_material"
              placeholder="Contoh: PET / HDPE"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>
        </div>

        {/* 4. Harga */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Estimasi Nilai Jual (Rp/kg)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">Rp</span>
            <input
              name="nilai_jual"
              type="number"
              placeholder="0"
              className="w-full border p-2 pl-10 rounded focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Harga estimasi bank sampah per kilogram.
          </p>
        </div>

        {/* 5. Konten Rekomendasi */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Panduan & Rekomendasi (Sesuai LHK)
          </label>
          <textarea
            name="isi_konten"
            rows={10}
            placeholder="1. Pemilahan...&#10;2. Penanganan...&#10;3. Manfaat..."
            className="w-full border p-3 rounded font-sans text-sm leading-relaxed focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Gunakan tombol Enter untuk membuat baris baru.
          </p>
        </div>

        {/* Tombol Aksi */}
        <div className="pt-4 flex gap-3 border-t">
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 w-full md:w-auto"
          >
            + Simpan Data Baru
          </Button>
          <Link href="/admin/dashboard" className="w-full md:w-auto">
            <Button variant="outline" type="button" className="w-full">
              Batal
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
