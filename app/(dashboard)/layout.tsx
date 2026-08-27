import SidebarContainer from "@/components/navigation/sidebar-container";
import { checkSessionRedirect } from "@/services/auth/auth-session.server";
import { Metadata } from "next";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  metadataBase: new URL("https://jobtracker.chillie.my.id"),
  title: "Dashboard | Job Tracker App",
};

export default async function DashboardLayout({ children }: Props) {
  const userSession = await checkSessionRedirect();

  return (
    <div className="flex w-full flex-1 flex-col">
      <SidebarContainer user={userSession} side="right">
        {children}
      </SidebarContainer>
    </div>
  );
}
