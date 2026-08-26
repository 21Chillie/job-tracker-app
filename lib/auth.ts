import prisma from "@/lib/prisma";
import { sendEmailOTP } from "@/services/email/email-otp-action.server";
import { updateUserRole } from "@/services/user/user-role.server";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";

const enableVerification = process.env.RESEND_API_KEY ? true : false;

// The email verification is optional. Since not needed for localhost.
// If the RESEND_API_KEY  key is not set, email verification is disabled.
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["x-forwarded-for", "cf-connecting-ip"],
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    requireEmailVerification: enableVerification,
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: enableVerification,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  rateLimit: {
    enabled: true,
    storage: "database",
    modelName: "rateLimit",
    window: 10,
    max: 100,
    customRules: {
      "/email-otp/send-verification-otp": {
        window: 600,
        max: 3,
      },
      "/sign-in/email": {
        window: 60,
        max: 5,
      },
    },
  },

  // This database hook is used to update the user's role if their email matches the admin email.
  databaseHooks: {
    user: {
      create: {
        after: async ({ id, email }) => {
          if (email === process.env.ADMIN_EMAIL) {
            await updateUserRole({ id, email });
          }
        },
      },
      update: {
        after: async ({ id, email }) => {
          if (email === process.env.ADMIN_EMAIL) {
            await updateUserRole({ id, email });
          }
        },
      },
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
  plugins: [
    emailOTP({
      // This function is called when a verification OTP is sent to the user. If the API key is not set, the function does nothing.
      async sendVerificationOTP({ email, otp, type }) {
        if (!enableVerification) return;
        void sendEmailOTP({ to: email, otp, type });
      },
      otpLength: 6, // OTP code length
      expiresIn: 600, // OTP code expires in 10 minutes
      allowedAttempts: 3, // Number of allowed attempts before blocking
      sendVerificationOnSignUp: true,
      resendStrategy: "rotate",
    }),

    nextCookies(),
  ],
});
