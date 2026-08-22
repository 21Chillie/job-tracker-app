"use client";

import { buttonVariants } from "@/components/ui/button";
import { ButtonLinkProps } from "@/types/global.type";
import Link from "next/link";

export default function ButtonLink({
  target,
  children,
  href,
  variant = "default",
  size = "default",
  className,
}: ButtonLinkProps) {
  return (
    <Link
      target={target}
      href={href}
      className={buttonVariants({ variant, size, className })}>
      {children}
    </Link>
  );
}
