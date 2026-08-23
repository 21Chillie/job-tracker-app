"use server";

import { auth } from "@/lib/auth";
import { SignUpFormSchemaType } from "@/types/auth.type";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// TODO: finish this logic
export async function emailSignUp({
  fullName: name,
  email,
  password,
}: SignUpFormSchemaType) {
  await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      callbackURL: "/dashboard",
    },
    headers: await headers(),
  });

  redirect("/dashboard");
}

// TODO: finish this logic
export async function emailSignIn() {}
