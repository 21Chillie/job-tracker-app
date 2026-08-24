import prisma from "@/lib/prisma";
import { sendEmailOTP } from "@/services/email/email-otp-action.server";
import { updateUserRole } from "@/services/user/user-role.server";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";

const enableVerification = process.env.RESEND_API_KEY ? true : false;

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
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
      async sendVerificationOTP({ email, otp, type }) {
        if (!enableVerification) return;
        void sendEmailOTP({ to: email, otp, type });
      },
      otpLength: 6,
      expiresIn: 600,
      allowedAttempts: 3,
      sendVerificationOnSignUp: true,
      resendStrategy: "rotate",
    }),

    nextCookies(),
  ],
});
