import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// TODO: refactor later, add rate limit and bot prevention
export const { POST, GET } = toNextJsHandler(auth);
