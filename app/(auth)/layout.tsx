import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL("https://jobtracker.chillie.my.id"),
  title: "Authentication | Job Tracker App",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-sm:bg-background mx-auto flex w-full flex-1 flex-col p-2.5 max-sm:p-4">
      <main className="bg-background relative grid flex-1 place-items-center rounded-2xl max-sm:bg-transparent sm:shadow-sm">
        <div className="grid w-full max-w-md place-items-center gap-4">
          <div className="flex w-full items-center justify-between">
            <Link
              href={"/"}
              className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              <ArrowLeft size={16} /> <span>Back to home</span>
            </Link>
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}
