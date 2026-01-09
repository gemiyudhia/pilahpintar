import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultSummaryProps {
  result: {
    id: string;
    class: string;
    confidence: string;
    recommendation: string;
  };
}

export function ResultSummary({ result }: ResultSummaryProps) {
  return (
    <div className="mt-6 w-full animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
        {/* Header Hasil */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">
              Terdeteksi
            </p>
            <h3 className="text-2xl font-bold text-gray-900">{result.class}</h3>
          </div>
          <div className="px-3 py-1 bg-green-100 text-green-700 font-bold rounded-lg text-sm">
            {result.confidence}
          </div>
        </div>

        {/* Recommendation Box */}
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 mb-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            <span className="font-semibold block mb-1 text-gray-800">
              Saran Penanganan:
            </span>
            {result.recommendation}
          </p>
        </div>

        {/* Tombol Detail */}
        <Link href={`/detection/result/${result.id}`} className="block">
          <Button
            variant="outline"
            className="w-full border-green-600 text-green-700 hover:bg-green-50 font-semibold"
          >
            Lihat Detail Lengkap <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
