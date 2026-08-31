import { AnimatedSidebarFooter } from "@/components/motion/animated-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

type SidebarFooterSkeletonProps = {
  className?: string;
};

export function SidebarFooterSkeleton({
  className,
}: SidebarFooterSkeletonProps) {
  return (
    <AnimatedSidebarFooter className={cn("gap-3 border-none p-3", className)}>
      <div className="flex items-center justify-between">
        <div className="flex min-h-11 w-full items-center gap-3 overflow-hidden rounded-xl p-1">
          <div className="size-9">
            <Skeleton className="size-full rounded-full" />
          </div>

          <span className="min-w-0 flex-1">
            <Skeleton className="h-4 w-1/3 rounded" />
            <Skeleton className="mt-1.5 h-3 w-4/5 rounded" />
          </span>
        </div>

        <ChevronRight
          aria-hidden="true"
          className="text-muted-foreground size-4 shrink-0 group-data-[state=collapsed]/sidebar:hidden"
        />
      </div>
    </AnimatedSidebarFooter>
  );
}
