"use server";

import { auth } from "@/lib/auth";
import { AuthErrorStatusTextType } from "@/types/auth.type";
import { type SocialProvider } from "better-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function socialSignIn({
  provider,
  currentPathname,
}: {
  provider: SocialProvider;
  currentPathname: string;
}) {
  // Checking if the OAuth secret is available for both Google and GitHub
  const isOauthSecretAvailable = Boolean(
    (provider === "google" &&
      process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET) ||
    (provider === "github" &&
      process.env.GITHUB_CLIENT_ID &&
      process.env.GITHUB_CLIENT_SECRET),
  );

  // If the OAuth secret is not available, redirect with an error query parameter
  // So that client can display the error
  if (!isOauthSecretAvailable) {
    redirect(`${currentPathname}?error=incorrect_client_credentials`);
  }

  let redirectURL: string | undefined;

  try {
    const result = await auth.api.signInSocial({
      body: {
        provider,
        callbackURL: "/dashboard",
        errorCallbackURL: currentPathname,
      },
      headers: await headers(),
    });

    redirectURL = result.url ?? currentPathname;
  } catch (error) {
    const errorQuery: AuthErrorStatusTextType = "server_error";
    console.error("Social sign-in failed:", error);
    redirect(`${currentPathname}?error=${errorQuery}`);
  }

  // redirect to callbackURL if its success
  // otherwise, redirect to errorCallbackURL when there is error, the client will display the error
  if (redirectURL) {
    redirect(redirectURL);
  }
}
