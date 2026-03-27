import { Card, CardContent } from "@/components/ui/card";
import { DUMMY_DATA } from "@/lib/dummy-data";

import { ResultHeader } from "@/components/detection/ResultHeader";
import { ImageDisplay } from "@/components/detection/ImageDisplay";
import { InfoDetails } from "@/components/detection/InfoDetails";
import { RecommendationList } from "@/components/detection/RecommendationList";
import { ActionButton } from "@/components/detection/ActionButton";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ResultPage({ params }: PageProps) {
  const { id } = await params;

  const data = DUMMY_DATA[id] || DUMMY_DATA["123"];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ResultHeader />
      <div className="container max-w-md mx-auto p-5 pb-10">
        <Card className="border-0 shadow-lg flex flex-col bg-white rounded-2xl">
          <ImageDisplay data={data} />
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
