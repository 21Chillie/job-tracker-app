"use client";

import { Loader } from "@/components/motion/loader";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { accountSignout } from "@/services/auth/auth-email.server";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export function SidebarFooterLogout() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      const res = await accountSignout();

      if (!res.success) {
        toast.error(res.statusText, {
          description: (
            <span className="text-muted-foreground text-sm">{res.message}</span>
          ),
        });
      }

      toast.success(res.statusText, {
        description: (
          <span className="text-muted-foreground text-sm">{res.message}</span>
        ),
      });
      router.push("/");
    });
  };

  return (
    <DropdownMenuItem isDisabled={isPending} onClick={handleLogout}>
      {isPending ? (
        <Loader className="text-muted-foreground" variant="spinner" />
      ) : (
        <LogOutIcon className="text-muted-foreground" />
      )}{" "}
      Sign out
    </DropdownMenuItem>
  );
}
