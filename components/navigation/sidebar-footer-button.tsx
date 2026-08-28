import { Button } from "@/components/ui/button";
import { avatarImageFallback } from "@/utils/user-helper";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

type Props = {
  session: {
    name: string;
    id: string;
    email: string;
    image: string | null | undefined;
  };
};

export default function SidebarFooterButton({ session }: Props) {
  return (
    <Button
      variant={"ghost"}
      type="button"
      className="hover:bg-muted focus-visible:ring-ring flex min-h-11 w-full items-center gap-3 overflow-hidden rounded-xl p-1 text-left transition-colors outline-none focus-visible:ring-2"
    >
      <Image
        className="rounded-full"
        src={session.image ?? avatarImageFallback}
        alt="Profile image"
        width={36}
        height={36}
      />

      <span className="min-w-0 flex-1 group-data-[state=collapsed]/sidebar:hidden">
        <span className="text-foreground block truncate text-sm font-medium">
          {session.name}
        </span>
        <span className="text-muted-foreground block truncate text-xs">
          {session.email}
        </span>
      </span>
      <ChevronRight
        aria-hidden="true"
        className="text-muted-foreground size-4 shrink-0 group-data-[state=collapsed]/sidebar:hidden"
      />
    </Button>
  );
}
