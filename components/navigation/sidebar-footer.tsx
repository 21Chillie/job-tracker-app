import { AnimatedSidebarFooter } from "@/components/motion/animated-sidebar";
import FallbackImage from "@/public/assets/images/avatar-placeholder-1.webp";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

type Props = {
  name: string;
  email: string;
  image: string | null | undefined;
};

export function SidebarFooter({ name, email, image }: Props) {
  return (
    <AnimatedSidebarFooter className="gap-3 border-none p-3">
      <button
        type="button"
        className="hover:bg-muted focus-visible:ring-ring flex min-h-11 w-full items-center gap-3 overflow-hidden rounded-xl p-1 text-left transition-colors outline-none focus-visible:ring-2"
      >
        {image ? (
          <Image
            className="rounded-full"
            src={image}
            alt="Profile image"
            width={36}
            height={36}
          />
        ) : (
          <Image
            className="rounded-full"
            src={FallbackImage}
            alt="Fallback profile image"
            width={36}
            height={36}
          />
        )}

        <span className="min-w-0 flex-1 group-data-[state=collapsed]/sidebar:hidden">
          <span className="text-foreground block truncate text-sm font-medium">
            {name}
          </span>
          <span className="text-muted-foreground block truncate text-xs">
            {email}
          </span>
        </span>
        <ChevronRight
          aria-hidden="true"
          className="text-muted-foreground size-4 shrink-0 group-data-[state=collapsed]/sidebar:hidden"
        />
      </button>
    </AnimatedSidebarFooter>
  );
}
