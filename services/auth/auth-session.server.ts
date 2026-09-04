"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function checkSession() {
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

export async function accountSignout() {
  try {
    await auth.api.signOut({ headers: await headers() });

    return {
      success: true,
      message: "Signed out successfully",
      statusText: "Sign Out",
    };
  } catch (error: unknown) {
    console.error("Signout Error:", error);
    let errorMessage = "Something went wrong during sign out";
    let errorStatusText = "Unknown Error";

    if (error instanceof APIError) {
      errorMessage = error.message;
      errorStatusText = error.name;
    } else if (error instanceof Error) {
      errorMessage = error.message;
      errorStatusText = error.name;
    }

    return {
      success: false,
      message: errorMessage,
      statusText: errorStatusText,
    };
  } finally {
    revalidateTag("user-email", "max");
    revalidateTag("user-quick-stats", "max");
    revalidateTag("check-user-id-data", "max");
  }
}
