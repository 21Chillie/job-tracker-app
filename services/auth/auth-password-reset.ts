"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function requestResetOTP(email: string) {
  try {
    await auth.api.requestPasswordResetEmailOTP({
      body: { email },
      headers: await headers(),
    });
  } catch (error: unknown) {
    console.error(error);
  }
}
