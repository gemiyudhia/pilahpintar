import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ResultSkeletonMobile() {
  return (
    <div className="lg:hidden space-y-6">
      <Card className="border-0 shadow-xl rounded-3xl bg-white overflow-hidden">
        <Skeleton className="w-full h-64 rounded-none" />
      </Card>

      <Card className="border-0 shadow-lg rounded-3xl bg-white">
        <CardContent className="p-6 space-y-4">
          <Skeleton className="h-9 w-3/4 rounded-xl" />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-6 w-16 rounded" />
            </div>
            <Skeleton className="h-2.5 w-full rounded-full" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg rounded-3xl bg-white">
        <CardContent className="p-6 space-y-3">
          <Skeleton className="h-3 w-20 rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
          <Skeleton className="h-4 w-4/5 rounded" />
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg rounded-3xl bg-white">
        <CardContent className="p-6 space-y-4">
          <Skeleton className="h-3 w-28 rounded" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="h-6 w-6 rounded-full shrink-0" />
              <Skeleton className="h-4 w-full rounded" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
