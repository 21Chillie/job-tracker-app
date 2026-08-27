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
import { useState } from "react";
import { destinations } from "./sidebar-menu-example";

export default function SidebarMenu() {
  const [active, setActive] = useState("People");
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <AnimatedSidebarContent className="px-2 pt-1">
      <AnimatedSidebarGroup className="pt-4">
        <AnimatedSidebarGroupLabel>Platform</AnimatedSidebarGroupLabel>
        <AnimatedSidebarGroupContent>
          <AnimatedSidebarMenu>
            {destinations.map(({ label, icon: Icon, children }) => (
              <AnimatedSidebarMenuItem key={label}>
                <AnimatedSidebarMenuButton
                  isActive={
                    active === label || children?.includes(active) === true
                  }
                  ariaExpanded={children ? openSection === label : undefined}
                  icon={<Icon className="size-4" />}
                  onSelect={() => {
                    setOpenSection((current) => {
                      if (!children) {
                        setActive(label);
                        return null;
                      }
                      return current === label ? null : label;
                    });
                  }}
                >
                  {label}
                </AnimatedSidebarMenuButton>
                {children ? (
                  <AnimatedSidebarMenuSub open={openSection === label}>
                    {children.map((child) => (
                      <AnimatedSidebarMenuSubItem key={child}>
                        <AnimatedSidebarMenuSubButton
                          isActive={active === child}
                          onSelect={() => setActive(child)}
                        >
                          {child}
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
