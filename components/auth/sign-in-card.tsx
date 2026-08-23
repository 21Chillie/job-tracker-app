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
import Link from "next/link";
import { Suspense } from "react";

export default async function SignInCard() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="border-b">
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>
          Ready to check and manage your job application? Please enter your
          details below.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Suspense>
          <SocialAuthContainer className="flex flex-wrap gap-4 sm:gap-2"/>
        </Suspense>

        <SeparatorText className="my-6">Or continue with email</SeparatorText>

        <SignUpForm />
      </CardContent>

      <CardAction className="w-full border-t pt-6 text-center">
        <p className="text-muted-foreground text-sm max-sm:mb-6">
          Dont have an account?{" "}
          <Link
            className="text-foreground hover:underline"
            href="/sign-up">
            Sign up
          </Link>
        </p>
      </CardAction>
    </Card>
  );
}
