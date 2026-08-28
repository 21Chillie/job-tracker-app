"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  AuthServerResponseType,
  SignInFormSchema,
  SignInFormSchemaType,
  SignUpFormSchema,
  SignUpFormSchemaType,
} from "@/types/auth.type";
import { authErrorResponseHelper } from "@/utils/auth-helper";
import { resolveMx } from "dns/promises";
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

  const validate = SignUpFormSchema.safeParse({ fullName, email, password });

  if (!validate.success) {
    return {
      success: false,
      statusText: "Validate Error",
      message: z.prettifyError(validate.error),
      redirectURL: "/sign-up",
    };
  }

  try {
    const isValidMx = await checkEmailMxRecord(validate.data.email);
    if (!isValidMx) {
      return {
        success: false,
        statusText: "Invalid Domain",
        message: "This email domain does not appear to be valid.",
        redirectURL: "/sign-up",
      };
    }

    const isUserExist = await prisma.user.findUnique({
      where: {
        email,
      },
      select: { email: true },
    });

    if (isUserExist) {
      return {
        success: false,
        statusText: "User Exists",
        message: "This email is already registered.",
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
    console.error("Sign Up Error:", error);
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
  const validate = SignInFormSchema.safeParse({ email, password });

  if (!validate.success) {
    return {
      success: false,
      statusText: "Validate Error",
      message: z.prettifyError(validate.error),
      redirectURL: "/sign-in",
    };
  }

  try {
    const res = await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: "/dashboard",
      },
      headers: await headers(),
      asResponse: true,
    });

    // Return early if sign in success
    if (res.ok) {
      return {
        success: true,
        statusText: res.statusText,
        message: "Your email has been verified and you’re now signed in.",
        redirectURL: "/dashboard",
      };
    }

    // Map response to standardized error format
    const body = (await res.json().catch(() => null)) as {
      code?: string;
      message?: string;
    } | null;
    const code = body?.code ?? "SIGN_IN_FAILED";
    const msg = body?.message ?? "Invalid email or password.";

    // If email not verified, resend OTP and return verification response
    if (res.status === 403 && code === "EMAIL_NOT_VERIFIED") {
      const otp = await resendOtpAction({ email });

      if (!otp.success) {
        return {
          success: false,
          statusText: otp.statusText,
          message: otp.message,
          redirectURL: "/sign-in",
        };
      }

      return {
        success: false,
        statusText: "EMAIL_NOT_VERIFIED",
        message: "Verification email sent. Please check your inbox.",
        redirectURL: `/verify-email?email=${encodeURIComponent(email)}`,
      };
    }

    // Return any better auth error when res !== ok
    return {
      success: false,
      statusText: code,
      message: msg,
      redirectURL: "/sign-in",
    };
  } catch (error: unknown) {
    // Return any unknown error
    console.error("Sign In Error:", error);
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
    await auth.api.verifyEmailOTP({
      body: {
        email,
        otp,
      },
      headers: await headers(),
    });

    return {
      success: true,
      message: "Email has been verified successfully",
      statusText: "Email Verified",
      redirectURL: "/dashboard",
    };
  } catch (error: unknown) {
    console.error("Verify Email OTP Error:", error);
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
    console.error("Resend OTP Error:", error);
    return { success: false, message: "", statusText: "" };
  }
}

export async function checkEmailMxRecord(email: string): Promise<boolean> {
  try {
    const domain = email.split("@")[1];
    if (!domain) return false;

    const mxRecords = await resolveMx(domain);
    return mxRecords.length > 0;
  } catch {
    return false;
  }
}
