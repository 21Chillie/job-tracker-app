import Sidebar from "@/components/navigation/sidebar";
import { Metadata } from "next";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  metadataBase: new URL("https://jobtracker.chillie.my.id"),
  title: "Dashboard | Job Tracker App",
};

export default async function DashboardLayout({ children }: Props) {
  return (
    <div className="flex w-full flex-1 flex-col">
      <Sidebar side="right">{children}</Sidebar>
    </div>
  );
}
