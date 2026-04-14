import { createAuthClient } from "better-auth/react";
import env from "@configs/env.config";

const authClient = createAuthClient({
  baseURL: env.BACKEND_URL,
  fetchOptions: {
    credentials: "include",
  },
});

export default authClient;
