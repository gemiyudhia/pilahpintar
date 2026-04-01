"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

import { ResultHeader } from "@/components/detection/ResultHeader";
import { ImageDisplay } from "@/components/detection/ImageDisplay";
import { InfoDetails } from "@/components/detection/InfoDetails";
import { RecommendationList } from "@/components/detection/RecommendationList";
import { ActionButton } from "@/components/detection/ActionButton";

import { useParams } from "next/navigation";
import {
  getKerajinanByKategori,
  Kerajinan,
} from "@/lib/services/kerajinanService";
import { mapLabelToKategori } from "@/lib/utils";
import { KerajinanCarousel } from "@/components/features/KerajinanCaraousel";

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
  const [kerajinan, setKerajinan] = useState<Kerajinan[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(`result_${id}`);
    if (!stored) return;

    const parsed: ResultData = JSON.parse(stored);
    setData(parsed);

    // Fetch kerajinan berdasarkan label hasil deteksi
    const idKategori = mapLabelToKategori(parsed.label);
    getKerajinanByKategori(idKategori).then(setKerajinan);
  }, [id]);

  if (!data) {
    return <div className="text-center mt-10">Loading hasil...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ResultHeader />

      <div className="container max-w-md mx-auto p-5 pb-10">
        <Card className="border-0 shadow-lg flex flex-col bg-white rounded-2xl">
          {/* GAMBAR HASIL DETEKSI */}
          <ImageDisplay data={data} />

          <CardContent className="p-6 space-y-6">
            {/* LABEL + DESKRIPSI DARI SUPABASE */}
            <InfoDetails
              title={`${data.label} (${(data.confidence * 100).toFixed(1)}%)`}
              description={data.description}
            />

            <div className="h-px w-full bg-gray-100" />

            {/* LANGKAH DAUR ULANG */}
            <RecommendationList steps={data.recommendations} />

            <div className="h-px w-full bg-gray-100" />

            {/* CAROUSEL KERAJINAN */}
            <KerajinanCarousel items={kerajinan} />

            <ActionButton />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
