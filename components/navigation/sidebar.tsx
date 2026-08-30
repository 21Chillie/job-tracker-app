import {
  AnimatedSidebar,
  AnimatedSidebarProvider,
  AnimatedSidebarRail,
} from "@/components/motion/animated-sidebar";
import { SidebarFooter } from "@/components/navigation/sidebar-footer";
import { SidebarFooterSkeleton } from "@/components/navigation/sidebar-footer-skeleton";
import SidebarHeader from "@/components/navigation/sidebar-header";
import { SidebarInset } from "@/components/navigation/sidebar-inset";
import SidebarMenu from "@/components/navigation/sidebar-menu";
import { Suspense } from "react";

type Props = {
  children: React.ReactNode;
  side?: "left" | "right";
};

export default function Sidebar({ children, side }: Props) {
  return (
    <AnimatedSidebarProvider className="min-h-0 flex-1 overflow-hidden">
      <AnimatedSidebar
        side={side}
        ariaLabel="Solace workspace"
        collapsible="icon"
        className="min-h-0 md:relative md:w-full md:max-w-56"
        panelClassName="h-svh border-r-0 border-l-0 bg-transparent"
      >
        <SidebarHeader className="md:fixed md:top-0 md:w-full md:max-w-56" />
        <SidebarMenu className="md:fixed md:top-16 md:w-full md:max-w-56" />
        <Suspense fallback={<SidebarFooterSkeleton />}>
          <SidebarFooter className="md:fixed md:bottom-0 md:max-w-56" />
        </Suspense>

        <AnimatedSidebarRail />
      </AnimatedSidebar>

      <SidebarInset side={side}>{children}</SidebarInset>
    </AnimatedSidebarProvider>
  );
}
