import Image from "next/image";
import SpinnerIcon from "./icons/SpinnerIcon";
import CheckIcon from "./icons/CheckIcon";
import XIcon from "./icons/XIcon";
import UndoIcon from "./icons/UndoIcon";
import { GambarItem } from "@/types/types";

type Props = {
  item: GambarItem;
  index: number;
  onToggleDelete: (i: number) => void;
  onRemoveNew: (i: number) => void;
};

export default function GambarCard({
  item,
  index,
  onToggleDelete,
  onRemoveNew,
}: Props) {
  const src = item.type === "existing" ? item.url : item.preview;

  return (
    <div className="relative group rounded-lg overflow-hidden border aspect-square bg-gray-50">
      {/* IMAGE */}
      <Image
        src={src}
        alt={`Gambar ${index + 1}`}
        fill
        className={`object-cover transition-all ${
          item.type === "existing" && item.markedForDelete
            ? "opacity-30 grayscale"
            : ""
        }`}
      />

      {/* ================= EXISTING ================= */}
      {item.type === "existing" && (
        <>
          {/* Badge */}
          {!item.markedForDelete && (
            <div className="absolute top-1.5 left-1.5 bg-blue-500 rounded-full px-2 py-0.5">
              <span className="text-white text-xs">Tersimpan</span>
            </div>
          )}

          {item.markedForDelete && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-500 rounded-lg px-2 py-1">
                <span className="text-white text-xs">Akan dihapus</span>
              </div>
            </div>
          )}

          {/* BUTTON DELETE / UNDO */}
          <button
            type="button"
            onClick={() => onToggleDelete(index)}
            className={`absolute top-1.5 right-1.5 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              item.markedForDelete
                ? "bg-green-500"
                : "bg-red-500 opacity-0 group-hover:opacity-100"
            }`}
          >
            {item.markedForDelete ? (
              <UndoIcon className="w-4 h-4 text-white" />
            ) : (
              <XIcon className="w-4 h-4 text-white" />
            )}
          </button>
        </>
      )}

      {/* ================= NEW ================= */}
      {item.type === "new" && (
        <>
          {/* STATUS BARU */}
          {!item.uploading && !item.uploaded && !item.error && (
            <div className="absolute top-1.5 left-1.5 bg-amber-500 rounded-full px-2 py-0.5">
              <span className="text-white text-xs">Baru</span>
            </div>
          )}

          {/* UPLOADING */}
          {item.uploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <SpinnerIcon className="w-6 h-6 text-white animate-spin" />
            </div>
          )}

          {/* SUCCESS */}
          {item.uploaded && (
            <div className="absolute top-1.5 left-1.5 bg-green-500 rounded-full p-1">
              <CheckIcon className="w-4 h-4 text-white" />
            </div>
          )}

          {/* ERROR */}
          {item.error && (
            <div className="absolute inset-0 bg-red-500/80 flex items-center justify-center p-2">
              <p className="text-white text-xs text-center">{item.error}</p>
            </div>
          )}

          {/* REMOVE BUTTON */}
          {!item.uploading && (
            <button
              type="button"
              onClick={() => onRemoveNew(index)}
              className="absolute top-1.5 right-1.5 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <XIcon className="w-4 h-4 text-white" />
            </button>
          )}
        </>
      )}

      {/* INDEX NUMBER */}
      <div className="absolute bottom-1.5 right-1.5 bg-black/50 rounded px-1.5 py-0.5">
        <span className="text-white text-xs">{index + 1}</span>
      </div>
    </div>
  );
}
