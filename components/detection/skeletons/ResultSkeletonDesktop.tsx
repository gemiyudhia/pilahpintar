import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ResultSkeletonDesktop() {
  return (
    <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
      {/* Left: Image */}
      <div className="sticky top-8">
        <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden bg-white">
          <Skeleton className="w-full h-120 rounded-none" />
        </Card>
      </div>

      {/* Right: Content */}
      <div className="space-y-6">
        <Card className="border-0 shadow-lg rounded-3xl bg-white">
          <CardContent className="p-8 space-y-5">
            <Skeleton className="h-10 w-3/4 rounded-xl" />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-36 rounded" />
                <Skeleton className="h-8 w-20 rounded" />
              </div>
              <Skeleton className="h-3 w-full rounded-full" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-3xl bg-white">
          <CardContent className="p-8 space-y-4">
            <Skeleton className="h-3 w-20 rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-5/6 rounded" />
            <Skeleton className="h-4 w-4/5 rounded" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-3xl bg-white">
          <CardContent className="p-8 space-y-4">
            <Skeleton className="h-3 w-28 rounded" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="h-6 w-6 rounded-full shrink-0" />
                <Skeleton className="h-4 w-full rounded" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
