"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { DeleteButton } from "./DeleteButton";
import { DeleteKerajinanButton } from "./DeleteKerajinanButton";

// ─── Types ────────────────────────────────────────────────────────────────────

type Kategori = {
  id_kategori: number;
  nama_alias: string;
  jenis_material: string;
  nilai_jual: number | null;
  label_kelas: string;
};

type Kerajinan = {
  id_kerajinan: number;
  nama_kerajinan: string;
  kategori: {
    nama_alias: string;
  };
  deskripsi: string | null;
  gambar_url: string[];
};

type Props = {
  dataKategori: Kategori[];
  dataKerajinan: Kerajinan[];
  query: string;
};

// ─── Badge helper ─────────────────────────────────────────────────────────────

function getBadgeClass(label: string) {
  if (label.includes("plastic")) return "bg-blue-100 text-blue-700";
  if (label.includes("paper")) return "bg-yellow-100 text-yellow-700";
  if (label.includes("metal")) return "bg-gray-200 text-gray-700";
  return "bg-green-100 text-green-700";
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function RecommendationsClient({
  dataKategori,
  dataKerajinan,
  query,
}: Props) {
  const [activeTab, setActiveTab] = useState<"rekomendasi" | "kerajinan">(
    "rekomendasi",
  );
  const [search, setSearch] = useState(query);

  const filteredKategori = dataKategori.filter((item) =>
    [item.nama_alias, item.jenis_material, item.label_kelas].some((v) => {
      if (v == null) {
        return false;
      }
      return v.toLowerCase().includes(search.toLowerCase());
    }),
  );

  const filteredKerajinan = dataKerajinan.filter((item) =>
    [
      item.nama_kerajinan,
      typeof item.kategori === "string"
        ? item.kategori
        : item.kategori.nama_alias,
      item.deskripsi,
    ].some((v) => {
      if (!v) return false;
      return v.toLowerCase().includes(search.toLowerCase());
    }),
  );

  return (
    <div className="mx-auto p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Manajemen Rekomendasi
      </h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium border ${
            activeTab === "rekomendasi"
              ? "bg-green-600 text-white border-green-600"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => {
            setActiveTab("rekomendasi");
            setSearch("");
          }}
        >
          Rekomendasi
        </button>

        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium border ${
            activeTab === "kerajinan"
              ? "bg-green-600 text-white border-green-600"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => {
            setActiveTab("kerajinan");
            setSearch("");
          }}
        >
          Kerajinan
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4 gap-3">
        <input
          type="text"
          placeholder={
            activeTab === "rekomendasi"
              ? "Cari kategori..."
              : "Cari kerajinan..."
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
        />

        <Link
          href={
            activeTab === "rekomendasi"
              ? "/admin/dashboard/rekomendasi/create"
              : "/admin/dashboard/kerajinan/create"
          }
        >
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Plus size={14} />
            Tambah
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        {activeTab === "rekomendasi" ? (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-3 text-left">No</th>
                <th className="p-3 text-left">Kategori</th>
                <th className="p-3 text-left">Jenis Material</th>
                <th className="p-3 text-left">Nilai Jual</th>
                <th className="p-3 text-left">Label YOLO</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredKategori.length > 0 ? (
                filteredKategori.map((item, index) => (
                  <tr
                    key={item.id_kategori}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-3">{index + 1}</td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getBadgeClass(
                          item.label_kelas,
                        )}`}
                      >
                        {item.nama_alias}
                      </span>
                    </td>

                    <td className="p-3">{item.jenis_material}</td>

                    <td className="p-3">
                      Rp {item.nilai_jual?.toLocaleString("id-ID") ?? "-"}
                    </td>

                    <td className="p-3 font-mono text-xs">
                      {item.label_kelas}
                    </td>

                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/dashboard/${item.id_kategori}`}>
                          <button className="p-2 rounded hover:bg-gray-100">
                            <Pencil size={14} />
                          </button>
                        </Link>

                        <DeleteButton
                          id={item.id_kategori}
                          title={item.nama_alias}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center text-gray-500 py-6">
                    {search
                      ? `Tidak ditemukan untuk "${search}"`
                      : "Belum ada data."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-3">No</th>
                <th className="p-3">Gambar</th>
                <th className="p-3">Nama</th>
                <th className="p-3">Kategori</th>
                <th className="p-3">Deskripsi</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredKerajinan.length > 0 ? (
                filteredKerajinan.map((item, index) => (
                  <tr
                    key={item.id_kerajinan}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-3">{index + 1}</td>

                    <td className="p-3">
                      {item.gambar_url ? (
                        <img
                          src={item.gambar_url[0]}
                          alt={item.nama_kerajinan}
                          className="w-10 h-10 object-cover rounded"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded" />
                      )}
                    </td>

                    <td className="p-3 font-medium">{item.nama_kerajinan}</td>

                    <td className="p-3">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                        {item.kategori.nama_alias}
                      </span>
                    </td>

                    <td className="p-3 text-gray-600 line-clamp-2">
                      {item.deskripsi}
                    </td>

                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/dashboard/kerajinan/${item.id_kerajinan}`}
                        >
                          <button className="p-2 rounded hover:bg-gray-100">
                            <Pencil size={14} />
                          </button>
                        </Link>

                        <DeleteKerajinanButton
                          id={item.id_kerajinan}
                          title={item.nama_kerajinan}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center text-gray-500 py-6">
                    {search
                      ? `Tidak ditemukan untuk "${search}"`
                      : "Belum ada data."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// function DeleteKerajinanButton({ id, title }: { id: number; title: string }) {
//   const handleDelete = async () => {
//     if (!confirm(`Hapus kerajinan "${title}"?`)) return;
//     await fetch(`/api/kerajinan/${id}`, { method: "DELETE" });
//     window.location.reload();
//   };

//   return (
//     <button
//       className="p-2 rounded hover:bg-red-100 text-red-600"
//       onClick={handleDelete}
//     >
//       <Trash2 size={14} />
//     </button>
//   );
// }
