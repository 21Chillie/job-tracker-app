"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { resendOtpAction } from "@/services/auth/auth-email.server";
import { Activity, useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

export default function OTPResend({
  className,
  email,
}: {
  className?: string;
  email: string;
}) {
  const [limitResend, setLimitResend] = useState<number>(0);
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const [isError, setIsError] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const cooldownRef = useRef<NodeJS.Timeout | null>(null);

  // Cooldown timer for resend button
  useEffect(() => {
    return () => {
      if (cooldownRef.current) clearInterval(cooldownRef.current);
    };
  }, []);

  const startCooldown = (seconds: number) => {
    setResendCooldown(seconds);
    cooldownRef.current = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          if (cooldownRef.current) clearInterval(cooldownRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResend = () => {
    startTransition(async () => {
      if (limitResend >= 3) return;
      setLimitResend(limitResend + 1);
      startCooldown(60);

      const res = await resendOtpAction({ email });

      if (!res.success) {
        setIsError(true);

        toast.error(res.statusText, {
          description: res.message,
          duration: 3000,
        });
      }
    });
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Activity mode={isError ? "hidden" : "visible"}>
        <p className="text-muted-foreground">
          {resendCooldown > 0 ? (
            `Please wait ${resendCooldown}s before resending.`
          ) : (
            <>
              {limitResend >= 3
                ? "You have reached the limit of resends."
                : "Don't receive the OTP code?"}
            </>
          )}
        </p>
      </Activity>

      <Activity mode={isError ? "visible" : "hidden"}>
        <p className="text-destructive">
          Something went wrong while resending the OTP code.
        </p>
      </Activity>
      <Button
        type="button"
        onClick={handleResend}
        isDisabled={resendCooldown > 0 || limitResend >= 3 || isPending}
        size={"xs"}
        className="bg-foreground text-background hover:bg-foreground/85"
      >
        Resend code
      </Button>
    </div>
  );
}
