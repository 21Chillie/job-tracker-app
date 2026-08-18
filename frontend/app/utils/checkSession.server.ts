import { getQueryClient } from "@configs/query-client.config";
import { sessionQueryOption } from "@hooks/auth/useSession.hook";
import { dehydrate } from "@tanstack/react-query";
import { redirect } from "react-router";
import getSessionCookie from "./cookie";

export async function checkSession(rawCookies: string) {
  const queryClient = getQueryClient();
  const cookie = getSessionCookie(rawCookies);

  if (!cookie) {
    queryClient.clear();
    redirect("/login");
    return;
  }

  await queryClient.prefetchQuery(sessionQueryOption(cookie));

  return {
    dehydratedState: dehydrate(queryClient),
  };
}
