import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { DetectionResult } from "@/lib/dummy-data";

export function ImageDisplay({ data }: { data: DetectionResult }) {
  if (!data?.imageUrl) {
    return (
      <div className="p-4 text-center text-gray-500">Gambar tidak tersedia</div>
    );
  }
  return (
    <div className="p-4 pb-0">
      <div className="relative w-full aspect-4/3 bg-gray-100 rounded-xl overflow-hidden shadow-sm">
        <Image
          src={data.imageUrl}
          alt={data.label}
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute bottom-3 left-3 flex gap-2">
          <Badge className="bg-white/95 text-green-700 hover:bg-white shadow-sm backdrop-blur-sm font-bold border-0">
            {data.confidence} Akurat
          </Badge>
          <Badge className="bg-black/60 text-white hover:bg-black/70 backdrop-blur-sm border-0">
            {data.category}
          </Badge>
        </div>
      </div>
    </div>
  );
}
