import { QueryClient, type QueryClientConfig } from "@tanstack/react-query";

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
};

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  // 'window' only exists in browsers. If it's undefined, we are on the Server
  if (typeof window === "undefined") {
    /**
     * Always return a BRAND NEW client for the server.
     * Since this is a new object, it has an empty cache.
     * This prevents User A's data from accidentally leaking to User B. (Security)
     */

    return new QueryClient(queryClientConfig);
  } else {
    if (!browserQueryClient)
      browserQueryClient = new QueryClient(queryClientConfig);

    /**
     * Return the SAME QueryClient every single time.
     * Because it's the same object, it keeps all cached data (like the user session) even when navigate between pages.
     */
    return browserQueryClient;
  }
}

export default queryClientConfig;
