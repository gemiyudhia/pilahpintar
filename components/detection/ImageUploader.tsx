"use client";

import { useRef } from "react";
import Image from "next/image";
import { Camera, Upload, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ImageUploaderProps {
  preview: string | null;
  isCameraMode: boolean;
  isAnalyzing: boolean;
  onFileSelect: (file: File) => void;
  onClear: () => void;
}

export function ImageUploader({
  preview,
  isCameraMode,
  isAnalyzing,
  onFileSelect,
  onClear,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    if (isCameraMode) {
      alert("Fitur Kamera (Segera Hadir)");
    } else {
      fileInputRef.current?.click();
    }
  };

  return (
    <Card className="aspect-square w-full bg-white border-2 border-dashed border-gray-300 rounded-3xl overflow-hidden relative shadow-sm hover:border-green-400 transition-colors group">
      {!preview ? (
        <div
          onClick={handleClick}
          className="w-full h-full flex flex-col items-center justify-center cursor-pointer bg-gray-50/50 hover:bg-green-50/30 transition-colors"
        >
          {isCameraMode ? (
            <>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                <Camera className="w-10 h-10" />
              </div>
              <p className="font-semibold text-gray-600">Ketuk untuk Foto</p>
              <p className="text-xs text-gray-400 mt-1">
                Pastikan cahaya cukup
              </p>
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
      ) : (
        <div className="relative w-full h-full">
          <Image
            src={preview}
            alt="Preview Sampah"
            fill
            className="object-contain p-2"
            unoptimized
          />

          <Button
            onClick={onClear}
            className="absolute top-4 right-4 bg-white/80 p-2 rounded-full text-red-500 shadow-sm hover:bg-white"
          >
            <RefreshCw className="w-5 h-5 cursor-pointer" />
          </Button>

          {isAnalyzing && (
            <div className="absolute inset-0 bg-black/20 z-10 flex items-center justify-center">
              <div className="w-full h-1 bg-green-500 absolute top-0 animate-scan"></div>
              <div className="bg-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-green-600" />
                <span className="text-sm font-bold text-gray-800">
                  Menganalisa...
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleInputChange}
      />
    </Card>
  );
}
