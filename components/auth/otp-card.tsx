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

// TODO: finish the functionality
export default function OTPCard({
  type,
  className,
}: {
  type: OTPEmailType;
  className?: string;
}) {
  const description = subjectMap[type];

  return (
    <Card className={cn("w-full max-w-md pb-0!", className)}>
      <CardHeader className="border-b">
        <CardTitle className="capitalize">{type.replace("-", " ")}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <OTPInputCode />
      </CardContent>

      <CardFooter className="border-t bg-accent pb-6 grid place-items-center">
        <OTPResend className="items-center" />
      </CardFooter>
    </Card>
  );
}
