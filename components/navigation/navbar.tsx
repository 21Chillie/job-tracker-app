import BtnThemeToggle from "@/components/global/btn-theme-toggle";
import ButtonLink from "@/components/navigation/button-link";
import { Briefcase } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between">
      <div>
        <Link
          href={"/"}
          className="flex items-center gap-2">
          <div className="outline-primary grid size-8 place-items-center rounded-full bg-[#28B664] text-black outline">
            <Briefcase size={20} />
          </div>

          <h6 className="text-xl font-semibold tracking-tight">Job Tracker</h6>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <BtnThemeToggle
          variant="outline"
          size="icon"
        />

        <ButtonLink href="/signup">Sign up</ButtonLink>
      </div>
    </nav>
  );
}
