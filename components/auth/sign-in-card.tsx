import ButtonBackHome from "@/components/auth/button-back-home";
import SignInForm from "@/components/auth/sign-in-form";
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
import { cn } from "@/lib/utils";
import { checkSession } from "@/services/auth/auth-session.server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function SignInCard({
  className,
}: {
  className?: string;
}) {
  const session = await checkSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="w-full space-y-4">
      <ButtonBackHome />

      <Card className={cn("w-full", className)}>
        <CardHeader className="border-b">
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Ready to check and manage your job application? Please enter your
            details below.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Suspense>
            <SocialAuthContainer className="flex flex-wrap gap-4 sm:gap-2" />
          </Suspense>

          <SeparatorText className="my-6">Or continue with email</SeparatorText>

          <SignInForm />
        </CardContent>

        <CardAction className="w-full border-t pt-6 text-center">
          <p className="text-muted-foreground text-sm max-sm:mb-6">
            Dont have an account?{" "}
            <Link className="text-foreground hover:underline" href="/sign-up" prefetch={"auto"}>
              Sign up
            </Link>
          </p>
        </CardAction>
      </Card>
    </div>
  );
}
