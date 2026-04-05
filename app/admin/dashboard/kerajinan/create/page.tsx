"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const BUCKET_NAME = "kerajinan-images";

type Kategori = {
  id_kategori: number;
  nama_alias: string;
};

type GambarItem = {
  file: File;
  preview: string;
  uploading: boolean;
  uploaded: boolean;
  url: string | null;
  error: string | null;
};

export default function CreateKerajinanPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [kategoriList, setKategoriList] = useState<Kategori[]>([]);
  const [kategoriLoaded, setKategoriLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [gambarItems, setGambarItems] = useState<GambarItem[]>([]);

  const [form, setForm] = useState({
    nama_kerajinan: "",
    id_kategori: "",
    deskripsi: "",
  });

  const loadKategori = async () => {
    if (kategoriLoaded) return;
    const { data } = await supabase
      .from("kategori")
      .select("id_kategori, nama_alias")
      .order("nama_alias");
    if (data) setKategoriList(data);
    setKategoriLoaded(true);
  };

  // Ketika user pilih file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newItems: GambarItem[] = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      uploading: false,
      uploaded: false,
      url: null,
      error: null,
    }));

    setGambarItems((prev) => [...prev, ...newItems]);

    // Reset input agar file yang sama bisa dipilih lagi
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Upload satu file ke Supabase Storage
  const uploadSingleFile = async (
    item: GambarItem,
    index: number,
  ): Promise<string | null> => {
    setGambarItems((prev) =>
      prev.map((g, i) =>
        i === index ? { ...g, uploading: true, error: null } : g,
      ),
    );

    const ext = item.file.name.split(".").pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, item.file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      setGambarItems((prev) =>
        prev.map((g, i) =>
          i === index
            ? {
                ...g,
                uploading: false,
                error: "Gagal upload: " + uploadError.message,
              }
            : g,
        ),
      );
      return null;
    }

    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    const publicUrl = urlData.publicUrl;

    setGambarItems((prev) =>
      prev.map((g, i) =>
        i === index
          ? { ...g, uploading: false, uploaded: true, url: publicUrl }
          : g,
      ),
    );

    return publicUrl;
  };

  const removeGambar = async (index: number) => {
    const item = gambarItems[index];

    // Jika sudah terupload ke storage, hapus dari storage dulu
    if (item.url) {
      const fileName = item.url.split("/").pop();
      if (fileName) {
        await supabase.storage.from(BUCKET_NAME).remove([fileName]);
      }
    }

    // Revoke object URL untuk bebaskan memori
    URL.revokeObjectURL(item.preview);
    setGambarItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Upload semua gambar yang belum terupload
    const uploadedUrls: string[] = [];

    for (let i = 0; i < gambarItems.length; i++) {
      const item = gambarItems[i];
      if (item.uploaded && item.url) {
        uploadedUrls.push(item.url);
      } else {
        const url = await uploadSingleFile(item, i);
        if (url) uploadedUrls.push(url);
      }
    }

    // Insert ke tabel kerajinan
    const { error: insertError } = await supabase.from("kerajinan").insert([
      {
        nama_kerajinan: form.nama_kerajinan,
        id_kategori: parseInt(form.id_kategori),
        deskripsi: form.deskripsi,
        gambar_url: uploadedUrls.length > 0 ? uploadedUrls : null,
      },
    ]);

    setLoading(false);

    if (insertError) {
      setError("Gagal menyimpan: " + insertError.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/admin/dashboard/recommendations"), 1500);
  };

  const anyUploading = gambarItems.some((g) => g.uploading);

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
              Tambah Kerajinan Baru
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
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-800">
            <svg
              className="w-5 h-5 text-green-600 shrink-0"
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
            <span className="font-medium">
              Berhasil disimpan! Mengalihkan...
            </span>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-800">
            <svg
              className="w-5 h-5 text-red-600 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Info Dasar */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs flex items-center justify-center font-bold">
                1
              </span>
              Informasi Dasar
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Kerajinan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pot Tanaman dari Botol Plastik"
                  value={form.nama_kerajinan}
                  onChange={(e) =>
                    setForm({ ...form, nama_kerajinan: e.target.value })
                  }
                  className="w-full border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori Sampah <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={form.id_kategori}
                  onChange={(e) =>
                    setForm({ ...form, id_kategori: e.target.value })
                  }
                  onFocus={loadKategori}
                  className="w-full border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                >
                  <option value="">-- Pilih Kategori --</option>
                  {kategoriList.map((k) => (
                    <option key={k.id_kategori} value={k.id_kategori}>
                      {k.nama_alias}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Jelaskan secara singkat kerajinan ini..."
                  value={form.deskripsi}
                  onChange={(e) =>
                    setForm({ ...form, deskripsi: e.target.value })
                  }
                  className="w-full border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Upload Gambar */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs flex items-center justify-center font-bold">
                2
              </span>
              Upload Gambar
            </h2>
            <p className="text-xs text-gray-400 mb-4 ml-7">
              Bisa upload lebih dari satu gambar. Format: JPG, PNG, WEBP. Maks.
              5MB per file.
            </p>

            {/* Drop Zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-green-100 flex items-center justify-center mx-auto mb-3 transition-colors">
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-500 group-hover:text-green-700 transition-colors font-medium">
                Klik untuk pilih gambar
              </p>
              <p className="text-xs text-gray-400 mt-1">
                atau drag & drop di sini
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* Preview Grid */}
            {gambarItems.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {gambarItems.map((item, index) => (
                  <div
                    key={index}
                    className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square bg-gray-50"
                  >
                    <Image
                      src={item.preview}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover"
                    />

                    {/* Overlay status */}
                    {item.uploading && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                      </div>
                    )}

                    {item.uploaded && (
                      <div className="absolute top-1.5 left-1.5 bg-green-500 rounded-full p-0.5">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}

                    {item.error && (
                      <div className="absolute inset-0 bg-red-500/80 flex items-center justify-center p-2">
                        <p className="text-white text-xs text-center">
                          {item.error}
                        </p>
                      </div>
                    )}

                    {/* Hapus button */}
                    {!item.uploading && (
                      <button
                        type="button"
                        onClick={() => removeGambar(index)}
                        className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}

                    {/* Nomor urut */}
                    <div className="absolute bottom-1.5 right-1.5 bg-black/50 rounded px-1.5 py-0.5">
                      <span className="text-white text-xs">{index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {gambarItems.length > 0 && (
              <p className="text-xs text-gray-400 mt-3">
                {gambarItems.filter((g) => g.uploaded).length} dari{" "}
                {gambarItems.length} gambar siap
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Link href="/admin/dashboard/recommendations">
              <button
                type="button"
                className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
            </Link>
            <button
              type="submit"
              disabled={loading || anyUploading}
              className="px-6 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Menyimpan...
                </>
              ) : (
                <>
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
                  Simpan Kerajinan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
