"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

import { ResultHeader } from "@/components/detection/ResultHeader";
import { ImageDisplay } from "@/components/detection/ImageDisplay";
import { InfoDetails } from "@/components/detection/InfoDetails";
import { RecommendationList } from "@/components/detection/RecommendationList";
import { ActionButton } from "@/components/detection/ActionButton";

import { useParams } from "next/navigation";

type ResultData = {
  id: string;
  label: string;
  confidence: number;
  description: string;
  imageUrl: string;
  category: string;
  recommendations: string[];
};

export default function ResultPage() {
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState<ResultData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(`result_${id}`);

    if (stored) {
      const parsed = JSON.parse(stored);
      console.log("📦 DATA DARI LOCAL STORAGE:", parsed);
      setData(parsed);
    } else {
      console.warn("❌ Data tidak ditemukan di localStorage");
    }
  }, [id]);

  if (!data) {
    return <div className="text-center mt-10">Loading hasil...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ResultHeader />

      <div className="container max-w-md mx-auto p-5 pb-10">
        <Card className="border-0 shadow-lg flex flex-col bg-white rounded-2xl">
          {/* ✅ GAMBAR HASIL DETEKSI */}
          <ImageDisplay data={data} />

          <CardContent className="p-6 space-y-6">
            {/* ✅ LABEL + DESKRIPSI DARI SUPABASE */}
            <InfoDetails
              title={`${data.label} (${(data.confidence * 100).toFixed(1)}%)`}
              description={data.description}
            />

            <div className="h-px w-full bg-gray-100" />

            {/* ✅ LANGKAH DAUR ULANG */}
            <RecommendationList steps={data.recommendations} />

            <ActionButton />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
