"use client";

import { useState } from "react";
import { ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "./header";
import { ModeToggle } from "./mode-toggle";
import { ImageUploader } from "./image-uploader";
import { ResultSummary } from "./result-summary";

export function DetectionClient() {
  // --- STATE ---
  const [isCameraMode, setIsCameraMode] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  // --- HANDLERS ---
  const handleFileSelect = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setResult(null);
  };

  const handleClear = () => {
    setPreview(null);
    setResult(null);
  };

  const handleDetect = () => {
    if (!preview) return;
    setIsAnalyzing(true);

    // Simulasi API Call
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        id: "123",
        class: "Plastic Bottle",
        confidence: "92%",
        recommendation: "Cuci bersih, remukkan, dan pisahkan tutupnya.",
      });
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
      {preview && !result && !isAnalyzing && (
        <Button
          onClick={handleDetect}
          className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-6 text-lg rounded-xl shadow-lg shadow-green-600/20"
        >
          <ScanLine className="mr-2 w-5 h-5 cursor-pointer" /> Mulai Deteksi
        </Button>
      )}

      {/* Hasil Deteksi */}
      {result && <ResultSummary result={result} />}
    </>
  );
}
