"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { uploadFile, deleteFile } from "@/lib/storage";

import GambarCard from "./GambarCard";
import SpinnerIcon from "./icons/SpinnerIcon";
import CheckIcon from "./icons/CheckIcon";
import { ExistingGambar, GambarItem, NewGambar, Props } from "@/types/types";
import { parseExistingUrls } from "@/types/helper";

export default function EditKerajinanClient({ id, kategori, data }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    nama_kerajinan: data.nama_kerajinan ?? "",
    id_kategori: data.id_kategori?.toString() ?? "",
    deskripsi: data.deskripsi ?? "",
  });

  const [gambarItems, setGambarItems] = useState<GambarItem[]>(
    parseExistingUrls(data.gambar_url).map((url) => ({
      type: "existing",
      url,
      markedForDelete: false,
    })),
  );

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

  const toggleDeleteExisting = (index: number) => {
    setGambarItems((prev) =>
      prev.map((item, i) => {
        if (i !== index || item.type !== "existing") return item;
        return { ...item, markedForDelete: !item.markedForDelete };
      }),
    );
  };

  const removeNewGambar = async (index: number) => {
    const item = gambarItems[index];
    if (item.type !== "new") return;
    if (item.uploaded && item.url) await deleteFile(item.url);
    URL.revokeObjectURL(item.preview);
    setGambarItems((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadSingleFile = async (item: NewGambar, index: number) => {
    setGambarItems((prev) =>
      prev.map((g, i) =>
        i === index && g.type === "new"
          ? { ...g, uploading: true, error: null }
          : g,
      ),
    );

    try {
      const url = await uploadFile(item.file);

      setGambarItems((prev) =>
        prev.map((g, i) =>
          i === index && g.type === "new"
            ? { ...g, uploading: false, uploaded: true, url }
            : g,
        ),
      );

      return url;
    } catch (e: any) {
      setGambarItems((prev) =>
        prev.map((g, i) =>
          i === index && g.type === "new"
            ? { ...g, uploading: false, error: e.message }
            : g,
        ),
      );
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const finalUrls: string[] = [];

    for (let i = 0; i < gambarItems.length; i++) {
      const g = gambarItems[i];

      if (g.type === "existing") {
        if (g.markedForDelete) await deleteFile(g.url);
        else finalUrls.push(g.url);
      } else {
        const url = g.uploaded ? g.url : await uploadSingleFile(g, i);
        if (url) finalUrls.push(url);
      }
    }

    await fetch("/api/update", {
      method: "POST",
      body: JSON.stringify({ id, form, urls: finalUrls }),
    });

    setLoading(false);
    setSuccess(true);
    setTimeout(() => router.push("/admin/dashboard/recommendations"), 1500);
  };

  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus kerajinan ini?")) return;

    const existingItems = gambarItems.filter(
      (g): g is ExistingGambar => g.type === "existing",
    );

    for (const g of existingItems) {
      await deleteFile(g.url);
    }

    await fetch("/api/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    router.push("/admin/dashboard/recommendations");
  };

  const anyUploading = gambarItems.some((g) => g.type === "new" && g.uploading);

  const activeCount = gambarItems.filter(
    (g) => g.type === "new" || !g.markedForDelete,
  ).length;

  const deletedCount = gambarItems.filter(
    (g) => g.type === "existing" && g.markedForDelete,
  ).length;

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
            <CheckIcon className="w-5 h-5 text-green-600 shrink-0" />
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
                  {kategori.map((k: any) => (
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

            {gambarItems.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {gambarItems.map((item, index) => (
                  <GambarCard
                    key={index}
                    item={item}
                    index={index}
                    onToggleDelete={toggleDeleteExisting}
                    onRemoveNew={removeNewGambar}
                  />
                ))}
              </div>
            )}

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
                JPG, PNG · Maks. 5MB
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
                    <SpinnerIcon className="w-4 h-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <CheckIcon className="w-4 h-4" />
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
