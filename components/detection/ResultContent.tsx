import { Card, CardContent } from "@/components/ui/card";
import { ImageDisplay } from "@/components/detection/ImageDisplay";
import { RecommendationList } from "@/components/detection/RecommendationList";
import { ActionButton } from "@/components/detection/ActionButton";
import { KerajinanCarousel } from "@/components/features/KerajinanCaraousel";
import { Kerajinan } from "@/lib/services/kerajinanService";

type ResultData = {
  id: string;
  label: string;
  confidence: number;
  description: string;
  imageUrl: string;
  category: string;
  recommendations: string[];
};

type Props = {
  data: ResultData;
  kerajinan: Kerajinan[];
};

export function ResultContent({ data, kerajinan }: Props) {
  return (
    <>
      {/* ── Desktop Layout ──────────────────────────────────────────────────── */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
        <div className="sticky top-8">
          <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden bg-white transition-all hover:shadow-3xl">
            <ImageDisplay data={data} />
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-lg rounded-3xl bg-white">
            <CardContent className="p-8">
              <div className="space-y-5">
                <h1 className="text-4xl font-bold text-slate-900 leading-tight">
                  {data.label}
                </h1>
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
                      style={{ width: `${data.confidence * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

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

          <Card className="border-0 shadow-lg rounded-3xl bg-white">
            <CardContent className="p-8">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">
                Langkah-Langkah
              </h2>
              <RecommendationList steps={data.recommendations} />
            </CardContent>
          </Card>

          <ActionButton />
        </div>
      </div>

      {/* ── Mobile & Tablet Layout ──────────────────────────────────────────── */}
      <div className="lg:hidden space-y-6">
        <Card className="border-0 shadow-xl rounded-3xl bg-white overflow-hidden">
          <ImageDisplay data={data} />
        </Card>

        <Card className="border-0 shadow-lg rounded-3xl bg-white">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                {data.label}
              </h1>
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
                    style={{ width: `${data.confidence * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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

        <Card className="border-0 shadow-lg rounded-3xl bg-white">
          <CardContent className="p-6">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
              Langkah-Langkah
            </h2>
            <RecommendationList steps={data.recommendations} />
          </CardContent>
        </Card>

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

        <ActionButton />
      </div>

      {/* ── Desktop Carousel ────────────────────────────────────────────────── */}
      {kerajinan.length > 0 && (
        <div className="hidden lg:block mt-16 pt-8 border-t border-slate-200">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Koleksi Kerajinan Serupa
            </h2>
            <p className="text-slate-600 text-lg">
              Jelajahi karya-karya lainnya yang sejenis dan temukan inspirasi
              baru
            </p>
          </div>
          <Card className="border-0 shadow-lg rounded-3xl bg-white">
            <CardContent className="p-8">
              <KerajinanCarousel items={kerajinan} />
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
