import { cn } from "@/lib/utils";
import { Briefcase } from "lucide-react";
import Link from "next/link";

export default function LogoLink({ className }: { className?: string }) {
  return (
    <Link href={"/"} className={cn("flex items-center gap-2", className)}>
      <div className="grid size-7 place-items-center rounded-lg bg-[#28B664] text-black">
        <Briefcase size={20} className="size-5" />
      </div>

      <h6 className="text-foreground truncate text-base font-semibold">
        Job Tracker
      </h6>
    </Link>
  );
}
