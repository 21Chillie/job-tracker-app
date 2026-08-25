"use server";

import OTPEmailTemplate from "@/emails/otp-email-template";
import getResend from "@/lib/email";
import { OTPEmailType } from "@/types/auth.type";
import { subjectMap } from "@/utils/auth-helper";
import { randomUUIDv7 } from "bun";

// This function sends an OTP email to the specified address using the Resend API.
// If the RESEND_API_KEY key is not set, the function does nothing.
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

    const resend = getResend();
    if (!resend) return;

    console.log("Trying to sending otp code...");
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "Job Tracker App <verify@resend.dev>",
      to,
      subject: emailSubject,
      react: OTPEmailTemplate({ otp, type }),
      text: `Your verification code is: ${otp}\n\nThis code expires in 10 minutes.\nIf you didn't request this code, you can safely ignore this email.\n\nJob Tracker App`,

      headers: {
        "X-Entity-Ref-ID": randomUUIDv7(),
      },
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
