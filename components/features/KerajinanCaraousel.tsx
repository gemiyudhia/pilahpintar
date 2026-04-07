"use client";

import { Kerajinan } from "@/lib/services/kerajinanService";
import Image from "next/image";

type Props = {
  items: Kerajinan[];
};

export function KerajinanCarousel({ items }: Props) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-4">
        Belum ada ide kerajinan untuk kategori ini.
      </p>
    );
  }

  return (
    <div className="w-full">
      <h3 className="font-semibold text-base mb-3">💡 Ide Kerajinan</h3>
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
        {items.map((item) => (
          <div
            key={item.id_kerajinan}
            className="min-w-40 max-w-40 snap-start rounded-xl border bg-card shadow-sm overflow-hidden shrink-0"
          >
            {/* Gambar */}
            <div className="relative w-full h-27.5 bg-muted">
              {item.gambar_url ? (
                <Image
                  src={item.gambar_url}
                  alt={item.nama_kerajinan}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl">
                  ♻️
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-2">
              <p className="font-semibold text-sm leading-tight line-clamp-2">
                {item.nama_kerajinan}
              </p>
              {item.deskripsi && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {item.deskripsi}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
