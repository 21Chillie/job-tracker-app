import { cn } from "@/lib/utils";
import { Briefcase } from "lucide-react";
import Link from "next/link";

export default function LogoLink({ className }: { className?: string }) {
  return (
    <Link
      href={"/"}
      className={cn("flex items-center gap-2", className)}>
      <div className="outline-primary grid size-8 place-items-center rounded-full bg-[#28B664] text-black outline">
        <Briefcase size={20} />
      </div>

      <h6 className="text-base font-semibold tracking-tight">Job Tracker</h6>
    </Link>
  );
}
