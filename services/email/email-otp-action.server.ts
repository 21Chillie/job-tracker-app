"use server";

import OTPEmailTemplate from "@/emails/otp-email-template";
import { resend } from "@/lib/email";
import { OTPEmailType } from "@/types/auth.type";
import { subjectMap } from "@/utils/auth-helper";

export async function sendEmailOTP({
  to,
  otp,
  type,
}: {
  to: string;
  otp: string;
  type: OTPEmailType;
}) {
  try {
    const emailSubject = subjectMap[type];

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "Acme <onboarding@resend.dev>",
      to,
      subject: emailSubject,
      react: OTPEmailTemplate({ otp, type }),
    });

    if (error) {
      console.error("Failed to send email:", error);
      throw new Error(`OTP code failed to send: ${error.message}`);
    }

    return data;
  } catch (err) {
    console.error("Email sending error:", err);
    throw err;
  }
}
