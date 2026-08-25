"use client";

import { OTPInput, OTPStatus } from "@/components/motion/otp-input";
import { verifyEmailOTP } from "@/services/auth/auth-email.server";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function OTPInputCode({ email }: { email: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<OTPStatus>("idle");
  const [isPending, startTransition] = useTransition();

  const handleVerify = (otp: string) => {
    startTransition(async () => {
      const result = await verifyEmailOTP({
        email,
        currentPathname: pathname,
        otp,
      });

      if (!result.success) {
        setStatus("error");

        toast.error(result.statusText, {
          description: result.message,
          duration: 3000,
        });

        return;
      }

      setStatus("success");

      toast.success(result.statusText, {
        description: result.message,
        duration: 3000,
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.push("/dashboard");
    });
  };

  return (
    <OTPInput
      length={6}
      disabled={isPending}
      label="Verification code"
      hint={
        isPending
          ? "Please wait, verifying account..."
          : "Enter correct code to verify."
      }
      successMessage="Success."
      errorMessage="Wrong code, try again."
      value={value}
      status={status}
      onChange={(v) => {
        setValue(v);
        if (status !== "idle") setStatus("idle");
      }}
      onComplete={(v) => handleVerify(v)}
    />
  );
}
