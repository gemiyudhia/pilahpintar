import { Button } from "@/components/ui/button";
import { createKategori } from "@/app/actions/actions";
import Link from "next/link";

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-500">
              Panel Admin · Manajemen Rekomendasi
            </p>
            <h1 className="text-lg font-bold text-gray-800 leading-tight">
              Tambah Data Kategori Baru
            </h1>
          </div>
        </div>
        <Link
          href="/admin/dashboard/recommendations"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-600 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Kembali
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <form action={createKategori} className="space-y-6">
          {/* Section 1: Label YOLO */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs flex items-center justify-center font-bold">
                1
              </span>
              Label Deteksi AI
            </h2>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <label className="block text-sm font-bold text-blue-800 mb-1">
                Label Kelas (YOLO)
              </label>
              <input
                name="label_kelas"
                placeholder="Contoh: plastic, paper, metal..."
                className="w-full border border-blue-200 bg-white p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                required
              />
              <p className="text-xs text-blue-600 mt-1">
                *Wajib diisi huruf kecil semua, tanpa spasi. Harus sama persis
                dengan nama class saat training model AI.
              </p>
            </div>
          </div>

          {/* Section 2: Info Material */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs flex items-center justify-center font-bold">
                2
              </span>
              Informasi Material
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Tampilan (User) <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="nama_alias"
                    placeholder="Contoh: Botol Plastik"
                    className="w-full border border-gray-200 p-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jenis Material <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="jenis_material"
                    placeholder="Contoh: PET / HDPE"
                    className="w-full border border-gray-200 p-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm"
                    required
                  />
                </div>
              </div>

              
            </div>
          </div>

          {/* Section 3: Panduan */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs flex items-center justify-center font-bold">
                3
              </span>
              Panduan &amp; Rekomendasi
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Konten Panduan (Sesuai LHK){" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                name="isi_konten"
                rows={10}
                placeholder={"1. Pemilahan...\n2. Penanganan...\n3. Manfaat..."}
                className="w-full border border-gray-200 p-3 rounded-lg font-sans text-sm leading-relaxed focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                Gunakan Enter untuk membuat baris baru.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Link href="/admin/dashboard/recommendations">
              <Button variant="outline" type="button">
                Batal
              </Button>
            </Link>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Simpan Data Baru
              </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
