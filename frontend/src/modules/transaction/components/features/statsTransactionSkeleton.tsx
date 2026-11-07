import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonStatsTransaction() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="bg-card flex flex-col gap-4 rounded-xl border p-5"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="size-10 rounded-lg" />
          </div>

          <div className="space-y-3">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-3 w-36" />
          </div>
        </div>
      ))}
    </div>
  );
}
