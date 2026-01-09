import { Metadata } from "next";
import { DetectionClient } from "@/components/detection/detection-client";

export const metadata: Metadata = {
  title: "Deteksi Sampah | PilahPintar",
  description: "Upload foto sampahmu untuk mengetahui cara daur ulangnya.",
};

export default function DetectionPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto flex items-center justify-center min-h-screen flex-col max-w-md px-4">
        <DetectionClient />
      </div>
    </div>
  );
}
