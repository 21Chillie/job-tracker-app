"use server";

import { auth } from "@/lib/auth";
import { cacheTag } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function checkSession() {
  "use cache: private";
  cacheTag("user-session");

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) return null;

    return {
      name: session.user.name,
      id: session.user.id,
      email: session.user.email,
      image: session.user.image,
    };
  } catch (error) {
    console.error("Session Error:", error);
    return null;
  }
}

export async function checkSessionRedirect() {
  let session: {
    name: string;
    id: string;
    email: string;
    image: string | null | undefined;
  } | null;
  try {
    session = await checkSession();
  } catch (error) {
    console.error("Session Error:", error);
    session = null;
  }

  if (!session) {
    redirect("/sign-up");
  }

  return session;
}
