import OTPCard from "@/components/auth/otp-card";

type Props = {
  email: string;
};

export function ForgotPasswordOtp({ email }: Props) {
  return <OTPCard type="forget-password" email={email} />;
}
