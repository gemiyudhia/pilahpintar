import { Card, CardContent } from "@/components/ui/card";
import { DUMMY_DATA } from "@/lib/dummy-data";

import { ResultHeader } from "@/components/detection/result-header";
import { ImageDisplay } from "@/components/detection/image-display";
import { InfoDetails } from "@/components/detection/info-details";
import { RecommendationList } from "@/components/detection/recommendation-list";
import { ActionButton } from "@/components/detection/action-button";

interface PageProps {
  params: Promise<{ id: string }>;
}

// 1. Tambahkan 'async' pada fungsi komponen
export default async function ResultPage({ params }: PageProps) {
  // 2. Lakukan 'await' pada params untuk mendapatkan ID
  const { id } = await params;

  // 3. Fetch data langsung (di Server)
  // Nanti di sini bisa diganti dengan database call: await db.find(...)
  const data = DUMMY_DATA[id] || DUMMY_DATA["123"];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <ResultHeader />

      <div className="container max-w-md mx-auto p-5 pb-10">
        <Card className="border-0 shadow-lg flex flex-col bg-white rounded-2xl">
          {/* Gambar */}
          <ImageDisplay data={data} />

          {/* Konten */}
          <CardContent className="p-6 space-y-6">
            <InfoDetails title={data.label} description={data.description} />

            <div className="h-px w-full bg-gray-100" />

            <div>
              <RecommendationList steps={data.recommendations} />
              <ActionButton />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
