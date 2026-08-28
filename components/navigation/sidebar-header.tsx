import {
  AnimatedSidebarClose,
  AnimatedSidebarHeader,
} from "@/components/motion/animated-sidebar";
import { cn } from "@/lib/utils";
import { Briefcase, X } from "lucide-react";
import Link from "next/link";

export default function SidebarHeader({ className }: { className?: string }) {
  return (
    <AnimatedSidebarHeader className={cn("p-3 pb-2", className)}>
      <div className="flex min-h-11 items-center gap-3 overflow-hidden px-2">
        <Link href={"/"}>
          <div className="grid size-7 shrink-0 place-items-center rounded-lg bg-[#28B664] text-black">
            <Briefcase aria-hidden="true" className="size-5" />
          </div>
        </Link>
        <Link
          href={"/"}
          className="focus-visible:ring-ring flex min-w-0 flex-1 items-center gap-2 rounded-lg text-left outline-none group-data-[state=collapsed]/sidebar:hidden focus-visible:ring-2"
        >
          <span className="text-foreground truncate text-sm font-semibold">
            Job Tracker App
          </span>
        </Link>
        <AnimatedSidebarClose className="text-muted-foreground hover:bg-muted ml-auto md:hidden">
          <X aria-hidden="true" className="size-4" />
        </AnimatedSidebarClose>
      </div>
    </AnimatedSidebarHeader>
  );
}
