import SignUpForm from "@/components/auth/sign-up-form";
import SocialAuthContainer from "@/components/auth/social-auth-container";
import SeparatorText from "@/components/global/separator-text";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { checkSession } from "@/services/auth/auth-session.server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function SignUpCard() {
  const session = await checkSession();
  if (session) {
    return redirect("/dashboard");
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="border-b">
        <CardTitle>Create new account</CardTitle>
        <CardDescription>
          Quick and easy. Sign up to track your job applications.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Suspense>
          <SocialAuthContainer className="flex flex-wrap gap-4 sm:gap-2" />
        </Suspense>

        <SeparatorText className="my-6">Or continue with email</SeparatorText>

        <SignUpForm />
      </CardContent>

      <CardAction className="w-full border-t pt-6 text-center">
        <p className="text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link className="text-foreground hover:underline" href="/sign-in">
            Log in
          </Link>
        </p>
      </CardAction>
    </Card>
  );
}
