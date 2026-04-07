import { ResultHeader } from "@/components/detection/ResultHeader";
import { ResultSkeletonDesktop } from "./ResultSkeletonDesktop";
import { ResultSkeletonMobile } from "./ResultSkeletonMobile";

export function ResultSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-emerald-50 to-slate-100">
      <ResultHeader />
      <main className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ResultSkeletonMobile />
          <ResultSkeletonDesktop />
        </div>
      </main>
    </div>
  );
}
