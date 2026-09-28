import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function ForgotPasswordEmail({ className }: Props) {
  return (
    <Card className={cn("w-full max-w-md pb-0!", className)}>
      <CardHeader className="border-b">
        <CardTitle className="capitalize">Reset Password</CardTitle>
        <CardDescription>
          Please enter your email address to send OTP code for reset password.
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>

      <CardFooter className="bg-accent grid place-items-center border-t pb-6"></CardFooter>
    </Card>
  );
}
