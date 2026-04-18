import { queryOptions, useQuery } from "@tanstack/react-query";
import authService from "@services/auth.service";

export function sessionQueryOption(cookie?: string) {
  return queryOptions({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await authService.getSession(cookie);
      return response;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

// Helper function to access sessionQueryOption
export function useSession() {
  return useQuery(sessionQueryOption());
}
