import { AnimatedSidebarFooter } from "@/components/motion/animated-sidebar";
import SidebarFooterButton from "@/components/navigation/sidebar-footer-button";
import { SidebarFooterLogout } from "@/components/navigation/sidebar-footer-logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { checkSessionRedirect } from "@/services/auth/auth-session.server";
import { avatarImageFallback, getNameInitials } from "@/utils/user-helper";
import { Settings2, User } from "lucide-react";

export async function SidebarFooter() {
  const session = await checkSessionRedirect();

  return (
    <AnimatedSidebarFooter className="gap-3 border-none p-3">
      <DropdownMenuTrigger>
        <SidebarFooterButton session={session} />

        <DropdownMenu>
          <DropdownMenuGroup>
            <DropdownMenuLabel className="p-0">
              <div className="flex items-center gap-2 px-1 py-1.5 text-sm">
                <Avatar className="size-8 rounded-lg">
                  <AvatarImage
                    src={session.image ?? avatarImageFallback}
                    alt={`${session.name} profile picture`}
                  />
                  <AvatarFallback className="rounded-lg">
                    {getNameInitials(session.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-sm">
                  <span className="truncate font-medium">{session.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {session.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem href="/dashboard/account">
              <User className="text-muted-foreground" /> Account
            </DropdownMenuItem>

            <DropdownMenuItem href="/dashboard/settings">
              <Settings2 className="text-muted-foreground" /> Settings
            </DropdownMenuItem>

            <SidebarFooterLogout />
          </DropdownMenuGroup>
        </DropdownMenu>
      </DropdownMenuTrigger>
    </AnimatedSidebarFooter>
  );
}
