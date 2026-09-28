"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ForgotPassword() {
  const pathname = usePathname();

  if (pathname !== "/sign-in") return null;

  return (
    <Link
      href={"/reset-password"}
      className="text-muted-foreground hover:text-foreground underline transition-colors hover:cursor-pointer"
    >
      Forgot Password?
    </Link>
  );
}
