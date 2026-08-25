"use client";

import OTPInputCode from "@/components/auth/otp-input-code";
import OTPResend from "@/components/auth/otp-resend";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { OTPEmailType } from "@/types/auth.type";
import { subjectMap } from "@/utils/auth-helper";

export default function OTPCard({
  type,
  className,
  email,
}: {
  type: OTPEmailType;
  className?: string;
  email: string;
}) {
  const description = subjectMap[type];

  return (
    <Card className={cn("w-full max-w-md pb-0!", className)}>
      <CardHeader className="border-b">
        <CardTitle className="capitalize">{type.replace("-", " ")}</CardTitle>
        <CardDescription>
          We are sending you an OTP code to{" "}
          <span className="lowercase">{description}</span>.
          <br />
          If you don&apos;t see it on your inbox, check your spam folder.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OTPInputCode email={email} />
      </CardContent>

      <CardFooter className="border-t bg-accent pb-6 grid place-items-center">
        <OTPResend className="items-center" email={email} />
      </CardFooter>
    </Card>
  );
}
