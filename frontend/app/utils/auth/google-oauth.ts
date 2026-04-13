import authClient from "./auth-client";

async function handleGoogleOauth() {
  const origin = window.location.origin;

  await authClient.signIn.social({
    provider: "google",
    callbackURL: `${origin}/`,
    errorCallbackURL: `${origin}/error`,
  });
}

export default handleGoogleOauth;
