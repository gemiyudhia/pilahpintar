"use client";

import { useState } from "react";
import { ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";
import { Header } from "./HeaderDetection";
import ImageUploader from "./ImageUploader";
import { useDetection } from "@/hooks/useDetection";

export function DetectionClient() {
  const [isCameraMode, setIsCameraMode] = useState(false);
  const { preview, isAnalyzing, handleFileSelect, handleClear, handleDetect } =
    useDetection();

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
      <Button
        onClick={handleDetect}
        disabled={!preview || isAnalyzing}
        className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-6 text-lg rounded-xl shadow-lg shadow-green-600/20"
      >
        <ScanLine className="mr-2 w-5 h-5" />
        {isAnalyzing ? "Menganalisis..." : "Mulai Deteksi"}
      </Button>
    </>
  );
}
