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
        className="min-h-0"
        panelClassName="h-full border-r-0 border-l-0 bg-transparent"
      >
        <SidebarHeader />
        <SidebarMenu />
        <Suspense fallback={<SidebarFooterSkeleton />}>
          <SidebarFooter />
        </Suspense>

        <AnimatedSidebarRail />
      </AnimatedSidebar>

      <SidebarInset side={side}>{children}</SidebarInset>
    </AnimatedSidebarProvider>
  );
}
