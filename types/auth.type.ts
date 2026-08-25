import { type User } from "@/prisma/generated/prisma/client";
import z from "zod";

export const SignInFormSchema = z.object({
  email: z.email({ error: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      error: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { error: "Password must contain at least one number" }),
});

export const SignUpFormSchema = SignInFormSchema.extend({
  fullName: z.string().min(1, "Field is required"),
});

export type SignInFormSchemaType = z.infer<typeof SignInFormSchema>;
export type SignUpFormSchemaType = z.infer<typeof SignUpFormSchema>;

export type AuthServerResponseType = {
  success: boolean;
  statusText: string;
  message: string;
  redirectURL: string;
};

export type AuthErrorStatusTextType =
  | "access_denied"
  | "invalid_request"
  | "unauthorized_client"
  | "invalid_scope"
  | "server_error"
  | "temporarily_unavailable"
  | "redirect_uri_mismatch"
  | "incorrect_client_credentials"
  | "bad_verification_code"
  | "unverified_user_email"
  | "account_not_linked";

export type UserRoleType = User["role"];

export type OTPEmailType =
  "sign-in" | "email-verification" | "forget-password" | "change-email";
