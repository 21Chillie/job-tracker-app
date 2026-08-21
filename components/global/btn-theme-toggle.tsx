"use client";

import { ThemeToggle } from "@/components/motion/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { ButtonProps } from "@/types/global.type";

export default function BtnThemeToggle({
  variant = "default",
  size = "default",
  className,
}: Omit<ButtonProps, "children" | "href">) {
  return (
    <ThemeToggle
      className={buttonVariants({ variant, size, className })}
      variant="circle-blur"
      start="bottom-up"
    />
  );
}
