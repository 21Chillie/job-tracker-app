import SignUpCard from "@/components/auth/sign-up-card";
import { checkSession } from "@/services/auth/auth-session.server";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const session = await checkSession();
  if (session) redirect("/");

  return <SignUpCard />;
}
