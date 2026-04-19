import { RefreshCw, Loader2 } from "lucide-react";

interface ImagePreviewProps {
  preview: string;
  isAnalyzing: boolean;
  onClear: () => void;
}

export default function ImagePreview({
  preview,
  isAnalyzing,
  onClear,
}: ImagePreviewProps) {
  return (
    <div className="relative w-full h-full">
      <img
        src={preview}
        alt="Preview Sampah"
        className="w-full h-full object-contain p-2"
      />

      <button
        onClick={onClear}
        className="absolute top-4 right-4 bg-white/80 p-2 rounded-full text-red-500 shadow-sm hover:bg-white transition-all"
      >
        <RefreshCw className="w-5 h-5 cursor-pointer" />
      </button>

      {isAnalyzing && (
        <div className="absolute inset-0 bg-black/20 z-10 flex items-center justify-center">
          <div className="bg-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-green-600" />
            <span className="text-sm font-bold text-gray-800">
              Menganalisa...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
