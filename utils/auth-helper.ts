import {
  AuthErrorStatusTextType,
  AuthServerResponseType,
  OTPEmailType,
} from "@/types/auth.type";

// This error codes is based on OAuth 2.0 Error Codes and with some specific error codes by provider (Google & GitHub)
export function getErrorMessage(statusText?: AuthErrorStatusTextType) {
  switch (statusText) {
    case "access_denied":
      return "You denied the authorization request.";
    case "invalid_request":
      return "The request was invalid. Please try again.";
    case "unauthorized_client":
      return "Sign-in is not configured correctly. Contact support.";
    case "invalid_scope":
      return "Invalid permissions requested. Contact support.";
    case "server_error":
      return "The provider had an error. Try again later.";
    case "temporarily_unavailable":
      return "The provider is temporarily unavailable. Try again later.";
    case "redirect_uri_mismatch":
      return "Configuration error. Contact support.";
    case "incorrect_client_credentials":
      return "Authentication is not configured correctly. Contact support.";
    case "bad_verification_code":
      return "Verification expired. Please try again.";
    case "unverified_user_email":
      return "Your GitHub email is not verified. Verify it first.";
    case "account_not_linked":
      return "Your account uses a different login provider. Sign in with the method you used to create your account and then you can link to OAuth provider.";
    default:
      return statusText ? "An unexpected error occurred." : null;
  }
}

export function authErrorResponseHelper({
  error,
  redirectURL,
}: {
  error: unknown;
  redirectURL: string;
}): AuthServerResponseType & { statusText: string } {
  if (error instanceof Error) {
    console.error(error);

    return {
      success: false,
      statusText: "Auth Error",
      message: getErrorMessage("server_error") as string,
      redirectURL,
    };
  }

  return {
    success: false,
    statusText: "Unknown Error",
    message: "An unknown error when trying authenticate with email",
    redirectURL,
  };
}

export const subjectMap: Record<OTPEmailType, string> = {
  "email-verification": "Verify your email address",
  "forget-password": "Reset your password",
  "sign-in": "sign-in your account",
  "change-email": "Change your email address",
};
