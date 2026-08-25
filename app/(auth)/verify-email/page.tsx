import OTPCard from "@/components/auth/otp-card";
import { getUserEmail } from "@/services/user/user-data.server";
import { redirect } from "next/navigation";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Check if there is query params ?email=...
  // Redirect to home if no email is provided
  const { email } = (await searchParams) as { email: string | undefined };
  if (typeof email !== "string") redirect("/");

  // Check if there is email but not verified in database
  // Redirect to home if no email it's not exist
  const userEmailExist = await getUserEmail({ email, emailVerified: false });
  if (!userEmailExist.data) redirect("/");

  return (
    <OTPCard type="email-verification" email={userEmailExist.data.email} />
  );
}
