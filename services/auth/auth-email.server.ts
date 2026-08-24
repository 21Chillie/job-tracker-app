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
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

export async function emailSignUp({
  fullName,
  email,
  password,
}: SignUpFormSchemaType): Promise<AuthServerResponseType> {
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

    redirect("/dashboard");
  } catch (error: unknown) {
    return authErrorResponseHelper({ error, redirectURL: "/sign-up" });
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

    redirect("/dashboard");
  } catch (error: unknown) {
    return authErrorResponseHelper({ error, redirectURL: "/sign-up" });
  }
}
