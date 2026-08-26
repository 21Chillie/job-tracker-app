import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col p-2.5">
      <main className="bg-background relative grid flex-1 place-items-center rounded-2xl p-6 sm:border sm:shadow-sm">
        <div className="grid w-full place-items-center gap-4 sm:p-6">
          <div className="flex w-full max-w-md items-center justify-between">
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
