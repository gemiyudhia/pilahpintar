import { useState } from "react";
import { useRouter } from "next/navigation";
import { blobFromUrl, runDetection } from "@/lib/services/gradioService";
import {
  getRecommendationByLabel,
  logDetectionHistory,
} from "@/lib/services/detectionService";
import { DetectionResult, Label } from "@/types";
import { toast } from "sonner";

export function useDetection() {
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { push } = useRouter();

  const handleFileSelect = (file: File) => {
    setPreview(URL.createObjectURL(file));
  };

  const handleClear = () => {
    setPreview(null);
  };

  const handleDetect = async () => {
    if (!preview) return;
    setIsAnalyzing(true);

    try {
      const blob = await blobFromUrl(preview);
      const { imageUrl, detections } = await runDetection(blob);

      const topDetection = detections[0];
      const recommendation = await getRecommendationByLabel(
        topDetection.label as Label,
      );

      const resultId = Date.now().toString();
      const finalResult: DetectionResult = {
        id: resultId,
        label: topDetection.label,
        confidence: topDetection.confidence,
        description: recommendation.description,
        recycleSteps: recommendation.steps,
        imageUrl,
      };

      localStorage.setItem(`result_${resultId}`, JSON.stringify(finalResult));

      await logDetectionHistory({
        imageUrl,
        confidence: topDetection.confidence,
        label: topDetection.label,
      });

      push(`/detection/result/${resultId}`);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Terjadi Kesalahan Saat Deteksi";
      toast.error(message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return { preview, isAnalyzing, handleFileSelect, handleClear, handleDetect };
}
