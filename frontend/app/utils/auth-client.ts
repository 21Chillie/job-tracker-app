import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: "http://localhost:3000/",
  fetchOptions: {
    credentials: "include",
  },
});

export default authClient;
