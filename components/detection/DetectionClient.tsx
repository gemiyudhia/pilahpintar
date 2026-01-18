"use client";

import { useState } from "react";
import { ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";
import { Header } from "./HeaderDetection";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";

export function DetectionClient() {
  // --- STATE ---
  const [isCameraMode, setIsCameraMode] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { push } = useRouter();

  // --- HANDLERS ---
  const handleFileSelect = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  const handleClear = () => {
    setPreview(null);
  };

  const handleDetect = () => {
    if (!preview) return;
    setIsAnalyzing(true);

    // Simulasi API Call
    setTimeout(() => {
      const dummyId = "123";
      const dummyResult = {
        id: dummyId,
        label: "botol plastic",
        confidence: 0.95,
        description:
          "Botol plastik jenis PET sangat mudah didaur ulang dan bernilai ekonomis tinggi.",
        recycleSteps: [
          "Kosongkan isi botol",
          "Lepaskan label jika bisa",
          "Remukkan botol",
          "Buang ke tong sampah anorganik",
        ],
        imageUrl: preview,
      };

      localStorage.setItem(`result_{dummyId}`, JSON.stringify(dummyResult));

      setIsAnalyzing(false);
      push(`/detection/result/${dummyId}`);
    }, 2000);
  };

  return (
    <>
      <Header />

      <ModeToggle isCameraMode={isCameraMode} onToggle={setIsCameraMode} />

      <ImageUploader
        preview={preview}
        isCameraMode={isCameraMode}
        isAnalyzing={isAnalyzing}
        onFileSelect={handleFileSelect}
        onClear={handleClear}
      />

      {/* Tombol Deteksi */}
      <Button
        onClick={handleDetect}
        className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-6 text-lg rounded-xl shadow-lg shadow-green-600/20"
      >
        <ScanLine className="mr-2 w-5 h-5 cursor-pointer" /> Mulai Deteksi
      </Button>
    </>
  );
}
