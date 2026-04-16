import { QueryClient, type QueryClientConfig } from "@tanstack/react-query";

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      // refetchOnWindowFocus: false,
    },
  },
};

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (typeof window === "undefined") {
    return new QueryClient(queryClientConfig);
  } else {
    if (!browserQueryClient)
      browserQueryClient = new QueryClient(queryClientConfig);
    return browserQueryClient;
  }
}

export default queryClientConfig;
