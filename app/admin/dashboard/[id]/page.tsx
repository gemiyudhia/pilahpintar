import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { updateKategori } from "@/app/actions/actions";
import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPage(props: PageProps) {
  const params = await props.params;
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return <div className="p-8">ID tidak valid</div>;
  }

  const data = await prisma.kategori.findUnique({
    where: { id_kategori: id },
    include: { rekomendasi: true },
  });

  if (!data) return <div className="p-8">Data tidak ditemukan!</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-500">
              Panel Admin · Manajemen Rekomendasi
            </p>
            <h1 className="text-lg font-bold text-gray-800 leading-tight">
              Edit Data:{" "}
              <span className="text-green-600">{data.nama_alias}</span>
            </h1>
          </div>
        </div>
        <Link
          href="/admin/dashboard"
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
        <form action={updateKategori} className="space-y-6">
          <input type="hidden" name="id_kategori" value={data.id_kategori} />

          {/* Section 1: Label YOLO (read-only) */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs flex items-center justify-center font-bold">
                1
              </span>
              Label Deteksi AI
            </h2>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <label className="block text-xs font-bold text-yellow-800 mb-1 uppercase tracking-wide">
                Label Deteksi AI (YOLO Class) — Jangan Diubah
              </label>
              <input
                type="text"
                value={data.label_kelas}
                disabled
                className="w-full bg-transparent font-mono text-gray-700 font-bold focus:outline-none cursor-not-allowed text-sm"
              />
              <p className="text-xs text-yellow-700 mt-1">
                *Label ini menghubungkan kamera AI dengan database. Hanya
                developer yang boleh mengubah.
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Tampilan (User)
                  </label>
                  <input
                    name="nama_alias"
                    defaultValue={data.nama_alias}
                    className="w-full border border-gray-200 p-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jenis Material
                  </label>
                  <input
                    name="jenis_material"
                    defaultValue={data.jenis_material}
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
                Konten Panduan (Sesuai LHK)
              </label>
              <textarea
                name="konten"
                defaultValue={data.rekomendasi?.isi_konten}
                rows={12}
                className="w-full border border-gray-200 p-3 rounded-lg font-sans text-sm leading-relaxed focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                *Anda bisa mengedit langkah-langkah daur ulang di sini. Gunakan
                Enter untuk baris baru.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Link href="/admin/dashboard">
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
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
