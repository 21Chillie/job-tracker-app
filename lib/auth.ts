import prisma from "@/lib/prisma";
import { updateUserRole } from "@/services/user/user-role.server";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
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
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
  plugins: [nextCookies()],
});
