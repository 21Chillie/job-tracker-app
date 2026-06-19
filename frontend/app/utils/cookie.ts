export default function getSessionCookie(rawCookie: string) {
  const cookies = new URLSearchParams(rawCookie.replace(/;\s*/g, "&"));
  const sessionToken = cookies.get("job-tracker.session_token");
  const secureSessionToken = cookies.get("__Secure-job-tracker.session_token");

  return secureSessionToken ?? sessionToken;
}
