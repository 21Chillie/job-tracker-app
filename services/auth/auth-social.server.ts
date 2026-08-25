"use server";

import { auth } from "@/lib/auth";
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
      process.env.GITHUB_CLIENT_SECRET)
  );

  // If the OAuth secret is not available, redirect with an error query parameter
  // So that client can display the error
  if (!isOauthSecretAvailable) {
    redirect(`${currentPathname}?error=incorrect_client_credentials`);
  }

  const result = await auth.api.signInSocial({
    body: {
      provider,
      callbackURL: "/dashboard",
      errorCallbackURL: currentPathname,
    },
    headers: await headers(),
  });

  // redirect to dashboard if success
  // otherwise, redirect to current pathname with error query parameter
  redirect(result.url ?? currentPathname);
}
