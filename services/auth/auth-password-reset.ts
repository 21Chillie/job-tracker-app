"use server";

import { auth } from "@/lib/auth";
import { emailSchema } from "@/lib/mail-checker";
import { headers } from "next/headers";
import z from "zod";

export async function requestResetOTP(email: string) {
  const isValidEmail = emailSchema.safeParse({ email });

  if (!isValidEmail.success) {
    console.error(isValidEmail.error);
    return {
      success: false,
      message: z.prettifyError(isValidEmail.error),
    };
  }

  try {
    await auth.api.requestPasswordResetEmailOTP({
      body: { email },
      headers: await headers(),
    });

    return { success: true };
  } catch (error: unknown) {
    console.error(error);

    return {
      success: true,
    };
  }
}
