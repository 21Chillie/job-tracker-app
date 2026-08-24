"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export default function OTPResend({ className }: { className?: string }) {
  const [resendCooldown, setResendCooldown] = useState(0);
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

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <p className="text-muted-foreground">
        {resendCooldown > 0 ? (
          `Please wait ${resendCooldown}s before resending.`
        ) : (
          <>Don&apos;t receive the OTP code?</>
        )}
      </p>
      <Button
        type="button"
        onClick={() => startCooldown(30)}
        isDisabled={resendCooldown > 0}
        size={"xs"}
        className="bg-foreground text-background hover:bg-foreground/85"
      >
        Resend code
      </Button>
    </div>
  );
}
