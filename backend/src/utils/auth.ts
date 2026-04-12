import { betterAuth } from "better-auth";
import db from "@db/db-client";
import env from "@config/env";

export const auth = betterAuth({
  database: db,
  baseURL: env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: env.BETTER_AUTH_SECRET,

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  trustedOrigins: ["http://localhost:5173"],
});
