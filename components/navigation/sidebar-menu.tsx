"use client";

import {
  AnimatedSidebarContent,
  AnimatedSidebarGroup,
  AnimatedSidebarGroupContent,
  AnimatedSidebarGroupLabel,
  AnimatedSidebarMenu,
  AnimatedSidebarMenuButton,
  AnimatedSidebarMenuItem,
  AnimatedSidebarMenuSub,
  AnimatedSidebarMenuSubButton,
  AnimatedSidebarMenuSubItem,
} from "@/components/motion/animated-sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { destinations } from "@/components/navigation/sidebar-menu-link";

export default function SidebarMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(pathname);
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <AnimatedSidebarContent className="px-2 pt-1">
      <AnimatedSidebarGroup className="pt-4">
        <AnimatedSidebarGroupLabel>Platform</AnimatedSidebarGroupLabel>
        <AnimatedSidebarGroupContent>
          <AnimatedSidebarMenu>
            {destinations.map(({ label, icon: Icon, href, children }) => (
              <AnimatedSidebarMenuItem key={label}>
                <AnimatedSidebarMenuButton
                  isActive={
                    active === label ||
                    children?.some((child) => child.href === active) === true
                  }
                  ariaExpanded={children ? openSection === label : undefined}
                  icon={<Icon className="size-4" />}
                  onSelect={() => {
                    if (children) {
                      setOpenSection((current) =>
                        current === label ? null : label,
                      );
                      return;
                    }
                    setActive(href);
                    router.push(href);
                  }}
                >
                  {label}
                </AnimatedSidebarMenuButton>
                {children ? (
                  <AnimatedSidebarMenuSub open={openSection === label}>
                    {children.map(({ href, label }) => (
                      <AnimatedSidebarMenuSubItem key={label}>
                        <AnimatedSidebarMenuSubButton
                          isActive={active === href}
                          onSelect={() => {
                            setActive(href);
                            router.push(href);
                          }}
                        >
                          {label}
                        </AnimatedSidebarMenuSubButton>
                      </AnimatedSidebarMenuSubItem>
                    ))}
                  </AnimatedSidebarMenuSub>
                ) : null}
              </AnimatedSidebarMenuItem>
            ))}
          </AnimatedSidebarMenu>
        </AnimatedSidebarGroupContent>
      </AnimatedSidebarGroup>
    </AnimatedSidebarContent>
  );
}
