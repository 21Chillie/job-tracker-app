"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function checkSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  return session;
}

export async function checkSessionRedirect() {
  const session = await checkSession();

  if (!session) {
    return redirect("/sign-up");
  }

  return session;
}
