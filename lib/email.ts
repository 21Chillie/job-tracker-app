import { Resend } from "resend";

// This function returns a Resend instance if the RESEND_API_KEY key is set, otherwise returns null.
// The use case of this is for self-hosted environments where the API key may not be available.
export default function getResend() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) return null;

  const resend = new Resend(apiKey);
  return resend;
}
