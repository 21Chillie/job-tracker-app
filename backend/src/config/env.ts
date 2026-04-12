const env = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
  BUN_APP_ENV: process.env.BUN_APP_ENV,
  FRONTEND_URL: process.env.FRONTEND_URL,
};

if (
  !env.GOOGLE_CLIENT_ID ||
  !env.GOOGLE_CLIENT_SECRET ||
  !env.BETTER_AUTH_SECRET ||
  !env.BETTER_AUTH_URL
) {
  console.warn("Missing credentials from environment!");
}

export default env;
