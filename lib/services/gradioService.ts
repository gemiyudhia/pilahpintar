import { Detection } from "@/types";

type GradioResult = {
  imageUrl: string;
  detections: Detection[];
};

export async function runDetection(imageBlob: Blob): Promise<GradioResult> {
  const formData = new FormData();

  formData.append("image", imageBlob, "image.jpg");

  const response = await fetch("/api/detect", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Deteksi gagal");
  }

  return {
    imageUrl: data.imageUrl,
    detections: data.detections,
  };
}

export async function blobFromUrl(url: string): Promise<Blob> {
  const response = await fetch(url);
  return response.blob();
}
