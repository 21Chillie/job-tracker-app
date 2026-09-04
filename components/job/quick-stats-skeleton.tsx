import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BadgeCheck } from "lucide-react";

export function QuickStatsSkeleton() {
  return (
    <Card>
      <CardHeader className="border-b">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="mt-2 h-4 w-full max-w-sm" />
      </CardHeader>

      <CardContent>
        <div className="mb-4 flex items-center gap-2">
          <BadgeCheck className="size-4 text-emerald-500" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-12" />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Skeleton className="h-5 w-22 shrink-0" />
              <Skeleton className="h-3 flex-1 rounded-4xl" />
              <Skeleton className="h-5 w-8 shrink-0" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
