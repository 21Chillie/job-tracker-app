import {
  AnimatedSidebar,
  AnimatedSidebarProvider,
  AnimatedSidebarRail,
} from "@/components/motion/animated-sidebar";
import { SidebarFooter } from "@/components/navigation/sidebar-footer";
import SidebarHeader from "@/components/navigation/sidebar-header";
import { SidebarInset } from "@/components/navigation/sidebar-inset";
import SidebarMenu from "@/components/navigation/sidebar-menu";

type Props = {
  children: React.ReactNode;
  side?: "left" | "right";
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null | undefined;
  };
};

export default function SidebarContainer({ children, side, user }: Props) {
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
        <SidebarFooter name={user.name} email={user.email} image={user.image} />
        <AnimatedSidebarRail />
      </AnimatedSidebar>

      <SidebarInset side={side}>{children}</SidebarInset>
    </AnimatedSidebarProvider>
  );
}
