import { NewGambarPayload } from "@/types/types";
import Image from "next/image";

type GambarPreviewItemProps = {
  item: NewGambarPayload;
  index: number;
  onRemove: (index: number) => void;
};

export function GambarPreviewItem({
  item,
  index,
  onRemove,
}: GambarPreviewItemProps) {
  return (
    <div className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square bg-gray-50">
      <Image
        src={item.preview}
        alt={`Preview ${index + 1}`}
        fill
        className="object-cover"
      />

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
          <p className="text-white text-xs text-center">{item.error}</p>
        </div>
      )}

      {!item.uploading && (
        <button
          type="button"
          onClick={() => onRemove(index)}
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

      <div className="absolute bottom-1.5 right-1.5 bg-black/50 rounded px-1.5 py-0.5">
        <span className="text-white text-xs">{index + 1}</span>
      </div>
    </div>
  );
}
