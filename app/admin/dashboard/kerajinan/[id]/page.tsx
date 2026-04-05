"use client";

import { useEffect, useState, useRef } from "react";
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

type PageProps = {
  params: Promise<{ id: string }>;
};

// Gambar yang sudah ada di storage (dari DB)
type ExistingGambar = {
  type: "existing";
  url: string;
  markedForDelete: boolean;
};

// Gambar baru yang baru dipilih user
type NewGambar = {
  type: "new";
  file: File;
  preview: string;
  uploading: boolean;
  uploaded: boolean;
  url: string | null;
  error: string | null;
};

type GambarItem = ExistingGambar | NewGambar;

export default function EditKerajinanPage({ params }: PageProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [id, setId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [kategoriList, setKategoriList] = useState<Kategori[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [gambarItems, setGambarItems] = useState<GambarItem[]>([]);

  const [form, setForm] = useState({
    nama_kerajinan: "",
    id_kategori: "",
    deskripsi: "",
  });

  useEffect(() => {
    const init = async () => {
      const resolved = await params;
      const parsedId = parseInt(resolved.id);
      if (isNaN(parsedId)) {
        setNotFound(true);
        setFetching(false);
        return;
      }
      setId(parsedId);

      const { data: kat } = await supabase
        .from("kategori")
        .select("id_kategori, nama_alias")
        .order("nama_alias");
      if (kat) setKategoriList(kat);

      const { data, error } = await supabase
        .from("kerajinan")
        .select("*")
        .eq("id_kerajinan", parsedId)
        .single();

      setFetching(false);

      if (error || !data) {
        setNotFound(true);
        return;
      }

      setForm({
        nama_kerajinan: data.nama_kerajinan ?? "",
        id_kategori: data.id_kategori?.toString() ?? "",
        deskripsi: data.deskripsi ?? "",
      });

      // Load gambar lama sebagai ExistingGambar
      let existingUrls: string[] = [];
      if (Array.isArray(data.gambar_url) && data.gambar_url.length > 0) {
        existingUrls = data.gambar_url;
      } else if (typeof data.gambar_url === "string" && data.gambar_url) {
        existingUrls = [data.gambar_url];
      }

      setGambarItems(
        existingUrls.map((url) => ({
          type: "existing",
          url,
          markedForDelete: false,
        })),
      );
    };
    init();
  }, []);

  // Pilih file baru
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newItems: NewGambar[] = files.map((file) => ({
      type: "new",
      file,
      preview: URL.createObjectURL(file),
      uploading: false,
      uploaded: false,
      url: null,
      error: null,
    }));

    setGambarItems((prev) => [...prev, ...newItems]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Tandai gambar lama untuk dihapus (toggle)
  const toggleDeleteExisting = (index: number) => {
    setGambarItems((prev) =>
      prev.map((item, i) => {
        if (i !== index || item.type !== "existing") return item;
        return { ...item, markedForDelete: !item.markedForDelete };
      }),
    );
  };

  // Hapus gambar baru yang belum disimpan
  const removeNewGambar = async (index: number) => {
    const item = gambarItems[index];
    if (item.type !== "new") return;

    // Jika sudah terupload ke storage, hapus dari storage
    if (item.uploaded && item.url) {
      const fileName = item.url.split("/").pop();
      if (fileName) {
        await supabase.storage.from(BUCKET_NAME).remove([fileName]);
      }
    }

    URL.revokeObjectURL(item.preview);
    setGambarItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Upload satu file baru ke storage
  const uploadSingleFile = async (item: NewGambar, index: number) => {
    setGambarItems((prev) =>
      prev.map((g, i) =>
        i === index && g.type === "new"
          ? { ...g, uploading: true, error: null }
          : g,
      ),
    );

    const formData = new FormData();
    formData.append("file", item.file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) {
      setGambarItems((prev) =>
        prev.map((g, i) =>
          i === index && g.type === "new"
            ? {
                ...g,
                uploading: false,
                error: result.error,
              }
            : g,
        ),
      );
      return null;
    }

    setGambarItems((prev) =>
      prev.map((g, i) =>
        i === index && g.type === "new"
          ? {
              ...g,
              uploading: false,
              uploaded: true,
              url: result.url,
            }
          : g,
      ),
    );

    return result.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setError(null);
    setLoading(true);

    const finalUrls: string[] = [];

    for (let i = 0; i < gambarItems.length; i++) {
      const item = gambarItems[i];

      if (item.type === "existing") {
        if (item.markedForDelete) {
          // Hapus dari storage
          const fileName = item.url.split("/").pop();
          if (fileName) {
            await supabase.storage.from(BUCKET_NAME).remove([fileName]);
          }
          // Tidak masuk finalUrls
        } else {
          finalUrls.push(item.url);
        }
      } else {
        // Gambar baru
        if (item.uploaded && item.url) {
          finalUrls.push(item.url);
        } else {
          const url = await uploadSingleFile(item, i);
          if (url) finalUrls.push(url);
        }
      }
    }

    const { error: updateError } = await supabase
      .from("kerajinan")
      .update({
        nama_kerajinan: form.nama_kerajinan,
        id_kategori: parseInt(form.id_kategori),
        deskripsi: form.deskripsi,
        gambar_url: finalUrls.length > 0 ? finalUrls : null,
      })
      .eq("id_kerajinan", id);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log("USER:", user);

    setLoading(false);

    if (updateError) {
      setError("Gagal menyimpan: " + updateError.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/admin/dashboard/recommendations"), 1500);
  };

  const handleDelete = async () => {
    if (!id || !confirm("Yakin ingin menghapus kerajinan ini?")) return;

    // Hapus semua gambar dari storage terlebih dahulu
    const existingItems = gambarItems.filter(
      (g): g is ExistingGambar => g.type === "existing",
    );
    const fileNames = existingItems
      .map((g) => g.url.split("/").pop())
      .filter(Boolean) as string[];

    if (fileNames.length > 0) {
      await supabase.storage.from(BUCKET_NAME).remove(fileNames);
    }

    const { error } = await supabase
      .from("kerajinan")
      .delete()
      .eq("id_kerajinan", id);

    if (error) {
      setError("Gagal menghapus: " + error.message);
      return;
    }

    router.push("/admin/dashboard/recommendations");
  };

  const anyUploading = gambarItems.some((g) => g.type === "new" && g.uploading);

  const activeCount = gambarItems.filter(
    (g) => g.type === "new" || !g.markedForDelete,
  ).length;

  const deletedCount = gambarItems.filter(
    (g) => g.type === "existing" && g.markedForDelete,
  ).length;

  // --- Loading state ---
  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
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
          Memuat data...
        </div>
      </div>
    );
  }

  // --- Not found state ---
  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            Data tidak ditemukan
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Pastikan ID yang diakses sesuai kolom{" "}
            <code className="bg-gray-100 px-1 rounded">id_kerajinan</code> di
            tabel.
          </p>
          <Link href="/admin/dashboard/recommendations">
            <button className="mt-4 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">
              Kembali ke Dashboard
            </button>
          </Link>
        </div>
      </div>
    );
  }

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
              Edit Kerajinan:{" "}
              <span className="text-green-600">
                {form.nama_kerajinan || "..."}
              </span>
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
        {/* ID badge */}
        <div className="mb-5 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5">
          <svg
            className="w-3.5 h-3.5 text-amber-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
            />
          </svg>
          <span className="text-xs font-mono text-amber-700 font-bold">
            id_kerajinan: {id}
          </span>
        </div>

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
              Perubahan berhasil disimpan! Mengalihkan...
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
                  value={form.deskripsi}
                  onChange={(e) =>
                    setForm({ ...form, deskripsi: e.target.value })
                  }
                  className="w-full border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Gambar */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs flex items-center justify-center font-bold">
                2
              </span>
              Kelola Gambar
            </h2>
            <p className="text-xs text-gray-400 mb-4 ml-7">
              Klik gambar lama untuk menandai hapus. Upload gambar baru untuk
              menambah.
            </p>

            {/* Grid gambar */}
            {gambarItems.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {gambarItems.map((item, index) => (
                  <div
                    key={index}
                    className="relative group rounded-lg overflow-hidden border aspect-square bg-gray-50"
                  >
                    {/* Gambar lama (existing) */}
                    {item.type === "existing" && (
                      <>
                        <Image
                          src={item.url}
                          alt={`Gambar ${index + 1}`}
                          fill
                          className={`object-cover transition-all ${item.markedForDelete ? "opacity-30 grayscale" : ""}`}
                        />
                        {/* Badge existing */}
                        {!item.markedForDelete && (
                          <div className="absolute top-1.5 left-1.5 bg-blue-500 rounded-full px-1.5 py-0.5">
                            <span className="text-white text-xs">
                              Tersimpan
                            </span>
                          </div>
                        )}
                        {/* Overlay tandai hapus */}
                        {item.markedForDelete && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-red-500 rounded-lg px-2 py-1">
                              <span className="text-white text-xs font-medium">
                                Akan dihapus
                              </span>
                            </div>
                          </div>
                        )}
                        {/* Toggle delete button */}
                        <button
                          type="button"
                          onClick={() => toggleDeleteExisting(index)}
                          className={`absolute top-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                            item.markedForDelete
                              ? "bg-green-500 opacity-100"
                              : "bg-red-500 opacity-0 group-hover:opacity-100"
                          }`}
                        >
                          {item.markedForDelete ? (
                            // Ikon undo
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
                                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                              />
                            </svg>
                          ) : (
                            // Ikon hapus
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
                          )}
                        </button>
                      </>
                    )}

                    {/* Gambar baru (new) */}
                    {item.type === "new" && (
                      <>
                        <Image
                          src={item.preview}
                          alt={`Baru ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        {/* Badge baru */}
                        {!item.uploading && !item.uploaded && !item.error && (
                          <div className="absolute top-1.5 left-1.5 bg-amber-500 rounded-full px-1.5 py-0.5">
                            <span className="text-white text-xs">Baru</span>
                          </div>
                        )}
                        {/* Uploading */}
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
                        {/* Uploaded */}
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
                        {/* Error */}
                        {item.error && (
                          <div className="absolute inset-0 bg-red-500/80 flex items-center justify-center p-2">
                            <p className="text-white text-xs text-center">
                              {item.error}
                            </p>
                          </div>
                        )}
                        {/* Hapus gambar baru */}
                        {!item.uploading && (
                          <button
                            type="button"
                            onClick={() => removeNewGambar(index)}
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
                      </>
                    )}

                    {/* Nomor urut */}
                    <div className="absolute bottom-1.5 right-1.5 bg-black/50 rounded px-1.5 py-0.5">
                      <span className="text-white text-xs">{index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Status ringkasan */}
            {gambarItems.length > 0 && (
              <div className="flex gap-3 mb-4 flex-wrap">
                <span className="text-xs text-gray-500">
                  {activeCount} gambar aktif
                </span>
                {deletedCount > 0 && (
                  <span className="text-xs text-red-500 font-medium">
                    · {deletedCount} akan dihapus
                  </span>
                )}
              </div>
            )}

            {/* Drop zone tambah gambar baru */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all group"
            >
              <div className="w-9 h-9 rounded-full bg-gray-100 group-hover:bg-green-100 flex items-center justify-center mx-auto mb-2 transition-colors">
                <svg
                  className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors"
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
              <p className="text-sm text-gray-500 group-hover:text-green-700 transition-colors font-medium">
                Tambah gambar baru
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                JPG, PNG, WEBP · Maks. 5MB
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
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-between items-center">
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2.5 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors flex items-center gap-1.5"
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Hapus Kerajinan
            </button>

            <div className="flex gap-3">
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
                    Simpan Perubahan
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
