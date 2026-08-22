import BtnThemeToggle from "@/components/global/btn-theme-toggle";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col p-4 xl:px-0">
      <header className="flex justify-end">
        <BtnThemeToggle
          variant="outline"
          size="icon"
        />
      </header>

      <main className="sm:bg-secondary/50 mt-4 md:mt-6 grid flex-1 place-items-center rounded-2xl sm:border sm:shadow-sm">
        <div className="grid w-full place-items-center gap-3 sm:p-6 ">
          <div className="flex w-full max-w-md items-start">
            <Link
              href={"/"}
              className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
              <ArrowLeft size={16}/> <span>Back to home</span>
            </Link>
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}
