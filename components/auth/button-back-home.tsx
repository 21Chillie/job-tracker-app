import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ButtonBackHome() {
  return (
    <div className="flex w-full items-center justify-between">
      <Link
        href={"/"}
        className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
      >
        <ArrowLeft size={16} /> <span>Back to home</span>
      </Link>
    </div>
  );
}
