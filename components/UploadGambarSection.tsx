import { NewGambarPayload } from "@/types/types";
import { GambarPreviewItem } from "./GambarPreviewItem";

type UploadGambarSectionProps = {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  gambarItems: NewGambarPayload[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
};

export function UploadGambarSection({
  fileInputRef,
  gambarItems,
  onFileChange,
  onRemove,
}: UploadGambarSectionProps) {
  const uploadedCount = gambarItems.filter((g) => g.uploaded).length;

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <h2 className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
        <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs flex items-center justify-center font-bold">
          2
        </span>
        Upload Gambar
      </h2>
      <p className="text-xs text-gray-400 mb-4 ml-7">
        Bisa upload lebih dari satu gambar. Format: JPG, PNG, WEBP. Maks. 5MB
        per file.
      </p>

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
        <p className="text-xs text-gray-400 mt-1">atau drag & drop di sini</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={onFileChange}
        />
      </div>

      {gambarItems.length > 0 && (
        <>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {gambarItems.map((item, index) => (
              <GambarPreviewItem
                key={index}
                item={item}
                index={index}
                onRemove={onRemove}
              />
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">
            {uploadedCount} dari {gambarItems.length} gambar siap
          </p>
        </>
      )}
    </div>
  );
}
