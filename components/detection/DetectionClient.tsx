"use client";

import { useState } from "react";
import { ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";
import { Header } from "./HeaderDetection";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";
import { Client } from "@gradio/client";
import { supabase } from "@/lib/supabase";

type Detection = {
  label: string;
  confidence: number;
};

type Label = "plastic" | "metal" | "paper" | "glass";

type Recommendation = {
  description: string;
  steps: string[];
};

type ApiResponse = [
  string | { url: string },
  {
    status: string;
    message?: string;
    data: Detection[];
  },
];

function mapLabelToKategori(label: string): number {
  switch (label) {
    case "plastic":
      return 1;
    case "paper":
      return 2;
    case "metal":
      return 3;
    case "glass":
      return 4;
    default:
      return 0;
  }
}

export function DetectionClient() {
  const [isCameraMode, setIsCameraMode] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { push } = useRouter();

  async function getRecommendation<T extends Label | string>(
    label: T,
  ): Promise<Recommendation> {
    const { data, error } = await supabase
      .from("kategori")
      .select(
        `
      id_kategori,
      label_kelas,
      rekomendasi (
        isi_konten
      )
    `,
      )
      .eq("label_kelas", label)
      .single();

    if (error || !data) {
      console.error("❌ Supabase error:", error);
      return {
        description: "Rekomendasi tidak ditemukan",
        steps: [],
      };
    }

    const isiKonten =
      (data.rekomendasi as { isi_konten: string }[])?.[0]?.isi_konten ?? "";

    return {
      description: isiKonten,
      steps: [isiKonten],
    };
  }

  const handleFileSelect = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  const handleClear = () => {
    setPreview(null);
  };

  const handleDetect = async () => {
    if (!preview) return;
    setIsAnalyzing(true);

    try {
      console.log("📸 Preview URL:", preview);

      // ambil file dari preview URL
      const response = await fetch(preview);
      const blob = await response.blob();

      console.log("📦 Blob siap dikirim:", blob);

      // connect ke Hugging Face
      const client = await Client.connect("alekvois/pilahpintar-detection");
      console.log("🔗 Connected ke Hugging Face");

      // kirim ke model
      const result = await client.predict("/predict", {
        image: blob,
      });

      console.log("📡 RAW RESULT:", result);
      console.log("📊 RESULT.DATA:", result.data);

      const rawData = result.data as ApiResponse;

      const [imageResult, json] = rawData;

      // 🔥 ambil URL gambar dari gradio
      const imageUrl = typeof imageResult === "object" ? imageResult.url : "";

      if (!json || json.status !== "success") {
        alert(json?.message || "Deteksi gagal");
        setIsAnalyzing(false);
        return;
      }

      const detections = json.data;

      if (!Array.isArray(detections) || detections.length === 0) {
        alert("Tidak ada objek terdeteksi");
        setIsAnalyzing(false);
        return;
      }

      const det = detections[0]; // ✅ sekarang aman

      console.log("🎯 Detection:", det);

      console.log("🖼️ Image Result:", imageResult);
      console.log("📦 Detections:", detections);

      // ❌ jika bukan sampah
      if (typeof detections === "string") {
        console.warn("⚠️ Tidak ada objek:", detections);
        alert(detections);
        setIsAnalyzing(false);
        return;
      }

      // ambil deteksi pertama
      const firstDetection = detections[0];

      console.log("🎯 Detection pertama:", firstDetection);

      const resultId = Date.now().toString();

      // 🔥 debug sebelum supabase
      console.log("📥 Kirim ke Supabase label:", firstDetection.label);

      const reco = await getRecommendation(firstDetection.label as Label);

      console.log("🧾 Recommendation dari Supabase:", reco);

      const finalResult = {
        id: resultId,
        label: det.label,
        confidence: det.confidence,
        description: reco.description,
        recycleSteps: reco.steps || [],
        imageUrl: imageUrl, // ✅ FIX DI SINI
      };

      console.log("✅ FINAL RESULT:", finalResult);

      console.log("LABEL MODEL:", det.label);

      localStorage.setItem(`result_${resultId}`, JSON.stringify(finalResult));

      await supabase.from("log_riwayat").insert([
        {
          lokasi_gambar:
            typeof imageResult === "object" ? imageResult.url : imageResult,
          skor_akurasi: det.confidence,
          label_deteksi: det.label,
          id_kategori: mapLabelToKategori(det.label), // nanti kita buat
        },
      ]);

      setIsAnalyzing(false);
      push(`/detection/result/${resultId}`);
    } catch (error) {
      console.error("❌ ERROR:", error);
      alert("Terjadi kesalahan saat deteksi");
      setIsAnalyzing(false);
    }
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
      <Button
        onClick={handleDetect}
        className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-6 text-lg rounded-xl shadow-lg shadow-green-600/20"
      >
        <ScanLine className="mr-2 w-5 h-5 cursor-pointer" /> Mulai Deteksi
      </Button>
    </>
  );
}
