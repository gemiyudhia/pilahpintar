"use client";

import { Kerajinan } from "@/lib/services/kerajinanService";
import {
  Brush,
  Sparkles,
  ChevronRight,
  X,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import { useState } from "react";

type Props = {
  items: Kerajinan[];
};

export function KerajinanCarousel({ items }: Props) {
  const [selectedItem, setSelectedItem] = useState<Kerajinan | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getImages = (item: Kerajinan): string[] => {
    const raw = item.gambar_url;
    if (Array.isArray(raw))
      return raw.filter((u) => typeof u === "string" && u.trim() !== "");
    if (typeof raw === "string" && raw.trim() !== "") return [raw];
    return [];
  };

  const getFirstImage = (item: Kerajinan): string | null => {
    const imgs = getImages(item);
    return imgs[0] ?? null;
  };

  const openDetail = (item: Kerajinan) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
  };

  const closeDetail = () => {
    setSelectedItem(null);
    setCurrentImageIndex(0);
  };

  const selectedImages = selectedItem ? getImages(selectedItem) : [];

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 mt-2">
        <Sparkles className="w-8 h-8 text-slate-300 mb-2" />
        <p className="text-sm text-slate-500 text-center">
          Belum ada ide kerajinan untuk kategori ini.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full mt-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-yellow-100 text-yellow-600 rounded-lg">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-slate-800 text-lg tracking-tight">
            Ide Kerajinan
          </h3>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
          {items.map((item) => {
            const imageUrl = getFirstImage(item);
            const hasImage = imageUrl !== null;

            return (
              <div
                key={item.id_kerajinan}
                onClick={() => openDetail(item)}
                className="w-70 shrink-0 snap-start rounded-2xl border border-emerald-100 bg-white shadow-sm overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="relative w-full h-48 bg-emerald-50 overflow-hidden">
                  <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Daur Ulang
                  </div>
                  {hasImage ? (
                    <img
                      src={imageUrl!}
                      alt={item.nama_kerajinan}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-emerald-300 bg-emerald-50/50">
                      <Brush className="w-10 h-10 mb-2 opacity-50" />
                      <span className="text-xs font-medium opacity-70">
                        Tanpa Gambar
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col grow">
                  <div className="flex items-start gap-2.5 mb-3">
                    <Brush className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                    <h4 className="font-bold text-slate-800 text-[15px] leading-snug group-hover:text-emerald-600 transition-colors">
                      {item.nama_kerajinan}
                    </h4>
                  </div>
                  {item.deskripsi ? (
                    <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-50 grow">
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {item.deskripsi}
                      </p>
                    </div>
                  ) : (
                    <div className="grow" />
                  )}
                  <div className="mt-4 flex items-center text-xs font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                    Lihat Detail <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Detail */}
      {/* Modal Detail */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
          onClick={closeDetail}
        >
          <div
            className="bg-white w-full sm:max-w-3xl sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col sm:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ===== KIRI: Gambar ===== */}
            <div className="relative w-full sm:w-1/2 h-72 sm:h-auto bg-emerald-50 shrink-0">
              {selectedImages.length > 0 ? (
                <>
                  <img
                    src={selectedImages[currentImageIndex]}
                    alt={selectedItem.nama_kerajinan}
                    className="object-cover w-full h-full"
                  />

                  {selectedImages.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setCurrentImageIndex((i) => Math.max(0, i - 1))
                        }
                        disabled={currentImageIndex === 0}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center disabled:opacity-30 hover:bg-white transition"
                      >
                        <ChevronLeft className="w-4 h-4 text-slate-700" />
                      </button>
                      <button
                        onClick={() =>
                          setCurrentImageIndex((i) =>
                            Math.min(selectedImages.length - 1, i + 1),
                          )
                        }
                        disabled={
                          currentImageIndex === selectedImages.length - 1
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center disabled:opacity-30 hover:bg-white transition"
                      >
                        <ChevronRightIcon className="w-4 h-4 text-slate-700" />
                      </button>

                      {/* Dots */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {selectedImages.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentImageIndex(i)}
                            className={`h-2 rounded-full transition-all ${
                              i === currentImageIndex
                                ? "bg-white w-5"
                                : "bg-white/50 w-2"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Thumbnail strip (desktop only) */}
                  {selectedImages.length > 1 && (
                    <div className="hidden sm:flex absolute bottom-0 left-0 right-0 gap-1.5 p-2 bg-linear-to-t from-black/40 to-transparent">
                      {selectedImages.map((url, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentImageIndex(i)}
                          className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                            i === currentImageIndex
                              ? "border-white"
                              : "border-transparent opacity-60"
                          }`}
                        >
                          <img
                            src={url}
                            alt=""
                            className="object-cover w-full h-full"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-emerald-300">
                  <Brush className="w-14 h-14 mb-2 opacity-40" />
                  <span className="text-sm opacity-60">Tidak ada gambar</span>
                </div>
              )}

              {/* Badge */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Daur Ulang
              </div>

              {/* Tombol tutup (mobile: di gambar, desktop: di kanan atas) */}
              <button
                onClick={closeDetail}
                className="sm:hidden absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-white transition"
              >
                <X className="w-4 h-4 text-slate-700" />
              </button>
            </div>

            {/* ===== KANAN: Detail ===== */}
            <div className="flex flex-col flex-1 overflow-hidden">
              {/* Header kanan (desktop) */}
              <div className="hidden sm:flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-100 shrink-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Detail Kerajinan
                </span>
                <button
                  onClick={closeDetail}
                  className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition"
                >
                  <X className="w-4 h-4 text-slate-600" />
                </button>
              </div>

              {/* Konten scrollable */}
              <div className="overflow-y-auto flex-1 p-6 flex flex-col gap-5">
                {/* Judul */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-100 rounded-xl shrink-0">
                    <Brush className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      Nama Kerajinan
                    </p>
                    <h2 className="font-bold text-slate-800 text-xl leading-snug">
                      {selectedItem.nama_kerajinan}
                    </h2>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-100" />

                {/* Deskripsi */}
                {selectedItem.deskripsi && (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-500" />
                      <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest">
                        Deskripsi
                      </p>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {selectedItem.deskripsi}
                    </p>
                  </div>
                )}

                {/* Jumlah foto */}
                {selectedImages.length > 0 && (
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    {selectedImages.length} foto tersedia
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
