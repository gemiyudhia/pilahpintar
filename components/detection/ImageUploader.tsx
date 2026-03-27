"use client";

import { useRef, useState, useEffect } from "react";
import { Camera, Upload, RefreshCw, X, Loader2 } from "lucide-react";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [cameraLoading, setCameraLoading] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      stopTracks();
    };
  }, []);

  useEffect(() => {
    if (showCamera) {
      initializeCamera();
    } else {
      stopTracks();
    }
  }, [showCamera]);

  const stopTracks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const initializeCamera = async () => {
    setCameraLoading(true);
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setCameraLoading(false);
        };
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setCameraError(
        "Tidak dapat mengakses kamera. Pastikan izin diberikan atau gunakan HTTPS."
      );
      setCameraLoading(false);
    }
  };

  const openCameraModal = () => {
    setShowCamera(true);
  };

  const closeCameraModal = () => {
    setShowCamera(false);
    setCameraError(null);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], `camera-${Date.now()}.jpg`, {
            type: "image/jpeg",
          });
          onFileSelect(file);
          closeCameraModal();
        }
      },
      "image/jpeg",
      0.9
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    if (isCameraMode) {
      openCameraModal();
    } else {
      fileInputRef.current?.click();
    }
  };

  return (
    <>
      <div className="aspect-square w-full max-w-md mx-auto bg-white border-2 border-dashed border-gray-300 rounded-3xl overflow-hidden relative shadow-sm hover:border-green-400 transition-colors group">
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
                <p className="font-semibold text-gray-600">Ambil Foto</p>
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
        )}

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleInputChange}
        />
      </div>

      {showCamera && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-black rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-end z-20">
              <button
                onClick={closeCameraModal}
                className="bg-black/40 text-white p-2 rounded-full hover:bg-black/60 backdrop-blur-md"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="relative aspect-3/4 bg-gray-900 w-full">
              {cameraLoading && (
                <div className="absolute inset-0 flex items-center justify-center text-white z-10">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              )}
              {cameraError ? (
                <div className="flex items-center justify-center h-full px-8 text-center">
                  <p className="text-red-400">{cameraError}</p>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            {!cameraError && (
              <div className="p-6 bg-gray-900 flex justify-center pb-8">
                <button
                  onClick={capturePhoto}
                  disabled={cameraLoading}
                  className="w-20 h-20 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center hover:scale-105 active:scale-95 transition-all focus:outline-none ring-4 ring-transparent hover:ring-green-500/50"
                >
                  <div className="w-16 h-16 bg-white rounded-full border-2 border-black/10"></div>
                </button>
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      )}
    </>
  );
}
