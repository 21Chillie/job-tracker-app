import authService from "@services/auth.service";
import { queryOptions } from "@tanstack/react-query";

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
