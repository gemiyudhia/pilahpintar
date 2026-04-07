"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

import { ResultHeader } from "@/components/detection/ResultHeader";
import { ImageDisplay } from "@/components/detection/ImageDisplay";
import { InfoDetails } from "@/components/detection/InfoDetails";
import { RecommendationList } from "@/components/detection/RecommendationList";
import { ActionButton } from "@/components/detection/ActionButton";

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

export default function ResultClient({ id }: { id: string }) {
  const [data, setData] = useState<ResultData | null>(null);
  const [kerajinan, setKerajinan] = useState<Kerajinan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(`result_${id}`);
    if (!stored) {
      setLoading(false);
      return;
    }

    const parsed: ResultData = JSON.parse(stored);
    setData(parsed);

    const idKategori = mapLabelToKategori(parsed.label);
    Promise.all([getKerajinanByKategori(idKategori)]).then(([items]) => {
      setKerajinan(items);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-block p-4 bg-emerald-50 rounded-full">
            <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
          </div>
          <p className="text-slate-700 font-medium text-lg">
            Memproses hasil...
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            Data tidak ditemukan
          </h2>
          <p className="text-slate-600">Silakan coba upload ulang gambar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-emerald-50 to-slate-100">
      <ResultHeader />

      <main className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Desktop: Two-column layout */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
            {/* Left: Image */}
            <div className="sticky top-8">
              <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden bg-white transition-all hover:shadow-3xl">
                <ImageDisplay data={data} />
              </Card>
            </div>

            {/* Right: Content */}
            <div className="space-y-6">
              {/* Title & Confidence Card */}
              <Card className="border-0 shadow-lg rounded-3xl bg-white">
                <CardContent className="p-8">
                  <div className="space-y-5">
                    <h1 className="text-4xl font-bold text-slate-900 leading-tight">
                      {data.label}
                    </h1>

                    {/* Confidence Indicator */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
                          Tingkat Kepercayaan
                        </span>
                        <span className="text-2xl font-bold text-emerald-600">
                          {(data.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-500"
                          style={{
                            width: `${data.confidence * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card className="border-0 shadow-lg rounded-3xl bg-white">
                <CardContent className="p-8">
                  <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
                    Deskripsi
                  </h2>
                  <p className="text-slate-700 leading-relaxed text-base">
                    {data.description}
                  </p>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="border-0 shadow-lg rounded-3xl bg-white">
                <CardContent className="p-8">
                  <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">
                    Langkah-Langkah
                  </h2>
                  <RecommendationList steps={data.recommendations} />
                </CardContent>
              </Card>

              {/* Action Button */}
              <ActionButton />
            </div>
          </div>

          {/* Mobile & Tablet: Single column layout */}
          <div className="lg:hidden space-y-6">
            <Card className="border-0 shadow-xl rounded-3xl bg-white overflow-hidden">
              <ImageDisplay data={data} />
            </Card>

            {/* Title & Confidence Card */}
            <Card className="border-0 shadow-lg rounded-3xl bg-white">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                    {data.label}
                  </h1>

                  {/* Confidence Indicator */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Tingkat Kepercayaan
                      </span>
                      <span className="text-xl font-bold text-emerald-600">
                        {(data.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="relative h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-500"
                        style={{
                          width: `${data.confidence * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="border-0 shadow-lg rounded-3xl bg-white">
              <CardContent className="p-6">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Deskripsi
                </h2>
                <p className="text-slate-700 leading-relaxed text-base">
                  {data.description}
                </p>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="border-0 shadow-lg rounded-3xl bg-white">
              <CardContent className="p-6">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                  Langkah-Langkah
                </h2>
                <RecommendationList steps={data.recommendations} />
              </CardContent>
            </Card>

            {/* Kerajinan Carousel - Maintained */}
            {kerajinan.length > 0 && (
              <div className="space-y-4">
                <div className="px-2">
                  <h2 className="text-lg font-bold text-slate-900">
                    Koleksi Kerajinan Serupa
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Jelajahi karya-karya lainnya yang sejenis
                  </p>
                </div>
                <Card className="border-0 shadow-lg rounded-3xl bg-white overflow-hidden">
                  <CardContent className="p-6">
                    <KerajinanCarousel items={kerajinan} />
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Action Button */}
            <ActionButton />
          </div>

          {/* Desktop Carousel - Full Width Below */}
          {kerajinan.length > 0 && (
            <div className="hidden lg:block mt-16 pt-8 border-t border-slate-200">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  Koleksi Kerajinan Serupa
                </h2>
                <p className="text-slate-600 text-lg">
                  Jelajahi karya-karya lainnya yang sejenis dan temukan
                  inspirasi baru
                </p>
              </div>
              <Card className="border-0 shadow-lg rounded-3xl bg-white">
                <CardContent className="p-8">
                  <KerajinanCarousel items={kerajinan} />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
