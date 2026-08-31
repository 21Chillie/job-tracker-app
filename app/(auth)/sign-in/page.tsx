import SignInCard from "@/components/auth/sign-in-card";
import { checkSession } from "@/services/auth/auth-session.server";
import { redirect } from "next/navigation";

export default async function LoginCard() {
const session = await checkSession()
if (session) redirect('/')

  
  return <SignInCard />;
}
