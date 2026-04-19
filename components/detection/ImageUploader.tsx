"use client";

import { useRef, useState } from "react";
import CameraModal from "./CameraModal";
import DropZone from "./DropZone";
import ImagePreview from "./ImagePreview";
import { useCamera } from "@/hooks/useCamera";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png"];

interface ImageUploaderProps {
  preview: string | null;
  isCameraMode: boolean;
  isAnalyzing: boolean;
  onFileSelect: (file: File) => void;
  onClear: () => void;
}

export default function ImageUploader({
  preview,
  isCameraMode,
  isAnalyzing,
  onFileSelect,
  onClear,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formatError, setFormatError] = useState<string | null>(null);

  const camera = useCamera();

  const handleClick = () => {
    if (isCameraMode) {
      camera.openCameraModal();
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setFormatError(
        "Format file tidak didukung, harap unggah file gambar (JPG/PNG)",
      );
      e.target.value = "";
      return;
    }

    setFormatError(null);
    onFileSelect(file);
  };

  return (
    <>
      <div className="aspect-square w-full max-w-md mx-auto bg-white border-2 border-dashed border-gray-300 rounded-3xl overflow-hidden relative shadow-sm hover:border-green-400 transition-colors group">
        {preview ? (
          <ImagePreview
            preview={preview}
            isAnalyzing={isAnalyzing}
            onClear={onClear}
          />
        ) : (
          <DropZone isCameraMode={isCameraMode} onClick={handleClick} />
        )}

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="*/*"
          onChange={handleInputChange}
        />
      </div>

      {formatError && (
        <p className="text-red-500 text-sm text-center mt-2">{formatError}</p>
      )}

      {camera.showCamera && (
        <CameraModal
          videoRef={camera.videoRef}
          canvasRef={camera.canvasRef}
          cameraLoading={camera.cameraLoading}
          cameraError={camera.cameraError}
          onClose={camera.closeCameraModal}
          onCapture={() => camera.capturePhoto(onFileSelect)}
        />
      )}
    </>
  );
}
