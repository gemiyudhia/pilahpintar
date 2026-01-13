// app/admin/dashboard/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { updateKategori } from "@/app/actions/actions";
import Link from "next/link";
import { redirect } from "next/navigation"; // Tambahkan ini buat safety

// 1. Definisikan Tipe Params sebagai Promise
type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPage(props: PageProps) {
  // 2. AWAIT PARAMS DULU (Ini yang bikin error sebelumnya)
  const params = await props.params;
  const id = parseInt(params.id);

  // Cek jika ID tidak valid (bukan angka)
  if (isNaN(id)) {
    return <div className="p-8">ID tidak valid</div>;
  }

  // 3. Ambil data existing
  const data = await prisma.kategori.findUnique({
    where: { id_kategori: id },
    include: { rekomendasi: true },
  });

  if (!data) return <div className="p-8">Data tidak ditemukan!</div>;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Edit Data: {data.nama_alias}
        </h1>
        <Link
          href="/admin/dashboard"
          className="text-sm text-blue-600 hover:underline"
        >
          &larr; Kembali ke Dashboard
        </Link>
      </div>

      <form
        action={updateKategori}
        className="space-y-6 bg-white p-6 border rounded-xl shadow-sm"
      >
        {/* ID Hidden (Wajib) */}
        <input type="hidden" name="id_kategori" value={data.id_kategori} />

        {/* 1. Label YOLO (READ ONLY - Tidak boleh diedit sembarangan) */}
        <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
          <label className="block text-xs font-bold text-yellow-800 mb-1 uppercase">
            Label Deteksi AI (YOLO Class) - Jangan Diubah
          </label>
          <input
            type="text"
            value={data.label_kelas}
            disabled
            className="w-full bg-transparent font-mono text-gray-700 font-bold focus:outline-none cursor-not-allowed"
          />
          <p className="text-xs text-yellow-700 mt-1">
            *Label ini menghubungkan kamera AI dengan database. Hanya developer
            yang boleh mengubah.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* 2. Nama Tampilan */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Nama Tampilan (User)
            </label>
            <input
              name="nama_alias"
              defaultValue={data.nama_alias}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
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
              defaultValue={data.jenis_material}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
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
              defaultValue={data.nilai_jual?.toString()}
              className="w-full border p-2 pl-10 rounded focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Sesuaikan dengan harga pasar pengepul terkini.
          </p>
        </div>

        {/* 5. Konten Rekomendasi (Text Area Panjang) */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Panduan & Rekomendasi (Sesuai LHK)
          </label>
          <textarea
            name="konten" // Sesuai seed.ts dan schema
            defaultValue={data.rekomendasi?.isi_konten}
            rows={12}
            className="w-full border p-3 rounded font-sans text-sm leading-relaxed focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            *Anda bisa mengedit langkah-langkah daur ulang di sini. Gunakan
            Enter untuk baris baru.
          </p>
        </div>

        {/* Tombol Aksi */}
        <div className="pt-4 flex gap-3 border-t">
          <Button type="submit" className="w-full md:w-auto">
            Simpan Perubahan
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
