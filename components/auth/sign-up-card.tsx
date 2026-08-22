import SignUpForm from "@/components/auth/sign-up-form";
import SocialSignInButton from "@/components/auth/social-sign-button";
import SeparatorText from "@/components/global/separator-text";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GoogleIcon from "@/public/assets/icons/google-color.svg";
import GithubIcon from "@icons-pack/react-simple-icons/icons/SiGithub";

import Image from "next/image";
import Link from "next/link";

export default async function SignUpCard() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="border-b">
        <CardTitle>Create new account</CardTitle>
        <CardDescription>
          Quick and easy. Sign up to track your job applications.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-4 sm:gap-2">
          <SocialSignInButton
            variant="outline"
            className="flex-1">
            <Image
              src={GoogleIcon}
              width={16}
              height={16}
              alt="google icon"
            />{" "}
            Continue with Google
          </SocialSignInButton>

          <SocialSignInButton
            variant="outline"
            className="flex-1">
            <GithubIcon />
            Continue with Github
          </SocialSignInButton>
        </div>

        <SeparatorText className="my-6">Or continue with email</SeparatorText>

        <SignUpForm />
      </CardContent>

      <CardAction className="w-full border-t text-center pt-6">
        <p className="text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link
            className="text-foreground hover:underline"
            href="/sign-in">
            Log in
          </Link>
        </p>
      </CardAction>
    </Card>
  );
}
