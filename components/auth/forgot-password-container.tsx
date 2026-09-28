"use client";

import ForgotPasswordEmail from "@/components/auth/forgot-password-email";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import { ForgotPasswordOtp } from "@/components/auth/forgot-password-otp";
import { ForgotPasswordStep } from "@/types/auth.type";
import { useState } from "react";

export default function ForgotPasswordContainer() {
  const [step, setStep] = useState<ForgotPasswordStep>("otp");
  const [email, setEmail] = useState<string>("");

  if (step === "email") {
    return <ForgotPasswordEmail />;
  }

  if (step === "otp") {
    return <ForgotPasswordOtp email={email} />;
  }

  return <ForgotPasswordForm />;
}
