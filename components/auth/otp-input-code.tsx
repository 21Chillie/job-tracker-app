"use client"

import { OTPInput, OTPStatus } from "@/components/motion/otp-input";
import { useState } from "react";

export default function OTPInputCode() {
  // TODO: remove this later
  const CODE = "123456";

  const [value, setValue] = useState("");
  const [status, setStatus] = useState<OTPStatus>("idle");

  return (
    <OTPInput
      label="Verification code"
      hint={`Enter correct code to verify.`}
      successMessage="Success."
      errorMessage="Wrong code, try again."
      value={value}
      status={status}
      onChange={(v) => {
        setValue(v);
        if (status !== "idle") setStatus("idle");
      }}
      onComplete={(v) => setStatus(v === CODE ? "success" : "error")}
    />
  );
}
