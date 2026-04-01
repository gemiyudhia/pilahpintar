import { ApiResponse, Detection } from "@/types";
import { Client } from "@gradio/client";
import { toast } from "sonner";

const GRADIO_SPACE = "alekvois/pilahpintar-detection";

type GradioResult = {
  imageUrl: string;
  detections: Detection[];
};

export async function runDetection(imageBlob: Blob): Promise<GradioResult> {
  const client = await Client.connect(GRADIO_SPACE);
  const result = await client.predict("/predict", { image: imageBlob });

  const [imageResult, json] = result.data as ApiResponse;

  if (!json || json.status !== "success") {
    toast.error(json?.message || "Deteksi Gagal");
    throw new Error(json?.message || "Deteksi Gagal");
  }

  if (!Array.isArray(json.data) || json.data.length === 0) {
    toast.error("Tidak Ada Objek Sampah Yang Terdeteksi");
    throw new Error("Tidak ada objek terdeteksi");
  }

  const imageUrl = typeof imageResult === "object" ? imageResult.url : "";

  return { imageUrl, detections: json.data };
}

export async function blobFromUrl(url: string): Promise<Blob> {
  const response = await fetch(url);
  return response.blob();
}
