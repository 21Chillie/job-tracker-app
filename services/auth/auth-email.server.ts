"use server";

import { auth } from "@/lib/auth";
import {
  AuthServerResponseType,
  SignInFormSchema,
  SignInFormSchemaType,
  SignUpFormSchema,
  SignUpFormSchemaType,
} from "@/types/auth.type";
import { authErrorResponseHelper } from "@/utils/auth-helper";
import { APIError } from "better-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

export async function emailSignUp({
  fullName,
  email,
  password,
}: SignUpFormSchemaType) {
  let processSuccess: boolean = false;
  const redirectURL = process.env.RESEND_API_KEY
    ? `/verify-email?email=${encodeURIComponent(email)}`
    : "/dashboard";

  try {
    const validate = SignUpFormSchema.safeParse({ fullName, email, password });

    if (!validate.success) {
      return {
        success: false,
        statusText: "Validate Error",
        message: z.prettifyError(validate.error),
        redirectURL: "/sign-up",
      };
    }

    await auth.api.signUpEmail({
      body: {
        name: fullName,
        email,
        password,
        callbackURL: "/dashboard",
      },
      headers: await headers(),
    });

    processSuccess = true;
  } catch (error: unknown) {
    return authErrorResponseHelper({ error, redirectURL: "/sign-up" });
  }

  if (processSuccess) {
    redirect(redirectURL);
  }
}

export async function emailSignIn({
  email,
  password,
}: SignInFormSchemaType): Promise<AuthServerResponseType> {
  try {
    const validate = SignInFormSchema.safeParse({ email, password });

    if (!validate.success) {
      return {
        success: false,
        statusText: "Validate Error",
        message: z.prettifyError(validate.error),
        redirectURL: "/sign-in",
      };
    }

    await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: "/dashboard",
      },
      headers: await headers(),
    });

    return {
      success: true,
      statusText: "Email Verified",
      message: "Your email has been verified and you’re now signed in.",
      redirectURL: "/dashboard",
    };
  } catch (error: unknown) {
    console.error(error);

    if (
      error instanceof APIError &&
      error.status === "FORBIDDEN" &&
      error.body?.code === "EMAIL_NOT_VERIFIED"
    ) {
      await resendOtpAction({ email });

      return {
        success: false,
        message: error.message,
        statusText: error.status,
        redirectURL: `/verify-email?email=${encodeURIComponent(email)}`,
      };
    }

    return authErrorResponseHelper({ error, redirectURL: "/sign-in" });
  }
}

export async function verifyEmailOTP({
  email,
  otp,
  currentPathname,
}: {
  email: string;
  otp: string;
  currentPathname: string;
}): Promise<AuthServerResponseType> {
  try {
    const result = await auth.api.verifyEmailOTP({
      body: {
        email,
        otp,
      },
      headers: await headers(),
    });

    console.log(result);
    return {
      success: true,
      message: "Email has been verified successfully",
      statusText: "Email Verified",
      redirectURL: "/dashboard",
    };
  } catch (error: unknown) {
    console.error(error);
    return authErrorResponseHelper({ error, redirectURL: currentPathname });
  }
}

export async function resendOtpAction({
  email,
}: {
  email: string;
}): Promise<Omit<AuthServerResponseType, "redirectURL">> {
  try {
    await auth.api.sendVerificationOTP({
      body: {
        email,
        type: "email-verification",
      },
      headers: await headers(),
    });

    return { success: true, message: "", statusText: "" };
  } catch (error: unknown) {
    console.error(error);
    return { success: false, message: "", statusText: "" };
  }
}
