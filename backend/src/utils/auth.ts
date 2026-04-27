import db from "@config/db-client";
import env from "@config/env";
import { betterAuth } from "better-auth";
import { randomBytes } from "node:crypto";

export const auth = betterAuth({
	database: db,
	baseURL: env.BETTER_AUTH_URL || "http://localhost:3001",
	secret: env.BETTER_AUTH_SECRET || randomBytes(32).toString("base64"),

	emailAndPassword: {
		enabled: true,
	},

	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID as string,
			clientSecret: env.GOOGLE_CLIENT_SECRET as string,
		},
	},

	user: {
		deleteUser: {
			enabled: true,
		},
	},

	trustedOrigins: [env.FRONTEND_URL as string, "http://localhost:3000", "http://localhost:5173"],
});
