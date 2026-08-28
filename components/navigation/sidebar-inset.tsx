import BtnThemeToggle from "@/components/global/btn-theme-toggle";
import {
  AnimatedSidebarInset,
  AnimatedSidebarTrigger,
} from "@/components/motion/animated-sidebar";
import { cn } from "@/lib/utils";
import { PanelLeft } from "lucide-react";
import Link from "next/link";
import { Activity, ReactNode } from "react";

type Props = {
  children: ReactNode;
  side?: "left" | "right";
};

export async function SidebarInset({ children, side = "left" }: Props) {
  return (
    <AnimatedSidebarInset
      className={cn(
        "bg-background mx-0 my-2.5 min-h-0 rounded-xl border shadow-md",
        side === "left" ? "mr-2.5 max-md:ml-2.5" : "ml-2.5 max-md:mr-2.5",
      )}
    >
      <header className="border-border flex h-16 shrink-0 items-center border-b px-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity mode={side === "left" ? "visible" : "hidden"}>
              <AnimatedSidebarTrigger className="text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <PanelLeft aria-hidden="true" className="size-4" />
              </AnimatedSidebarTrigger>
            </Activity>
            <Activity mode={side === "right" ? "visible" : "hidden"}>
              <BtnThemeToggle size="icon-sm" variant="ghost" />
            </Activity>
            <div className="bg-border h-5 w-px" />
            <p className="text-foreground text-sm font-medium">Dashboard</p>
          </div>

          <Activity mode={side === "right" ? "visible" : "hidden"}>
            <AnimatedSidebarTrigger className="text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <PanelLeft aria-hidden="true" className="size-4" />
            </AnimatedSidebarTrigger>
          </Activity>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col justify-between overflow-hidden p-5 sm:p-7">
        <div>{children}</div>

        <div className="border-border flex items-end justify-between border-t pt-4">
          <div>
            <p className="text-muted-foreground text-[10px] tracking-[0.16em] uppercase">
              Build by{" "}
              <Link
                target="_blank"
                className="text-foreground hover:underline"
                href={"https://github.com/21Chillie"}
              >
                Chillie
              </Link>
            </p>
          </div>
          <p className="text-muted-foreground hidden text-xs sm:block">
            Press ⌘B to toggle
          </p>
        </div>
      </div>
    </AnimatedSidebarInset>
  );
}
