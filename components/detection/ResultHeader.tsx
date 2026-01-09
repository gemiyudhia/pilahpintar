import Link from "next/link";
import { ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ResultHeader() {
  return (
    <div className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm border-b border-gray-100">
      <Link href="/detection">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-100 rounded-full text-gray-700"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
      </Link>
      <h1 className="font-bold text-lg text-gray-800">Detail Hasil</h1>
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-gray-100 rounded-full text-gray-700"
      >
        <Share2 className="w-5 h-5" />
      </Button>
    </div>
  );
}
