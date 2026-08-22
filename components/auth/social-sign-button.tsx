"use client";

import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/types/global.type";

export default function SocialSigInnButton({
  children,
  className,
  variant = "default",
  size = "default",
}: ButtonProps) {
  return (
    <Button
      className={className}
      variant={variant}
      size={size}
      type="button">
      {children}
    </Button>
  );
}
