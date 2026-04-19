import { Camera, Upload } from "lucide-react";

interface DropZoneProps {
  isCameraMode: boolean;
  onClick: () => void;
}

export default function DropZone({ isCameraMode, onClick }: DropZoneProps) {
  return (
    <div
      onClick={onClick}
      className="w-full h-full flex flex-col items-center justify-center cursor-pointer bg-gray-50/50 hover:bg-green-50/30 transition-colors"
    >
      {isCameraMode ? (
        <>
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
            <Camera className="w-10 h-10" />
          </div>
          <p className="font-semibold text-gray-600">Ambil Foto</p>
          <p className="text-xs text-gray-400 mt-1">Pastikan cahaya cukup</p>
        </>
      ) : (
        <>
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
            <Upload className="w-10 h-10" />
          </div>
          <p className="font-semibold text-gray-600">Pilih dari Galeri</p>
          <p className="text-xs text-gray-400 mt-1">JPG, PNG maks 5MB</p>
        </>
      )}
    </div>
  );
}
