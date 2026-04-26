import env from "@configs/env.config";
import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: env.BACKEND_URL || "http://localhost:3000",
  fetchOptions: {
    credentials: "include",
  },
});

export default authClient;
