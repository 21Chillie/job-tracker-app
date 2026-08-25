"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { socialSignIn } from "@/services/auth/auth-social.server";
import { ButtonProps } from "@/types/global.type";
import { type SocialProvider } from "better-auth";
import { useTransition } from "react";

export default function SocialAuthButton({
  pathname,
  provider,
  children,
  className,
  variant = "default",
  size = "default",
}: ButtonProps & { provider: SocialProvider; pathname: string }) {
  const [isPending, startTransition] = useTransition();

  const handleSocialSignIn = () => {
    startTransition(async () => {
      await socialSignIn({ provider, currentPathname: pathname });
    });
  };

  return (
    <Button
      type="button"
      onClick={handleSocialSignIn}
      isDisabled={isPending}
      className={className}
      variant={variant}
      size={size}
    >
      {isPending ? (
        <>
          <Spinner /> Redirecting to{" "}
          <span className="capitalize">{provider}</span>
        </>
      ) : (
        <>{children}</>
      )}
    </Button>
  );
}
