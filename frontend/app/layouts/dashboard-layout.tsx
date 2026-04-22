import Dock from "@components/dock/Dock";
import Navbar from "@components/navbar/Navbar";
import Sidebar from "@components/sidebar/Sidebar";
import { getQueryClient } from "@configs/query-client.config";
import { sessionQueryOption, useSession } from "@hooks/auth/useSession.hook";
import { dehydrate, HydrationBoundary, useQuery } from "@tanstack/react-query";
import { Outlet, redirect, useNavigation } from "react-router";
import type { Route } from "./+types/dashboard-layout";
import { LoadingSpinner } from "~/components/reuse-ui/LoadingSpinner";

/**
 * Fix bug data keep refetching when navigate the page
 * For future references: https://github.com/remix-run/react-router/discussions/12944#discussioncomment-12056134
 */

export async function loader({ request }: Route.LoaderArgs) {
  const cookie = request.headers.get("cookie") || "";
  const queryClient = getQueryClient();

  const session = await queryClient.fetchQuery(sessionQueryOption(cookie));

  if (!cookie || !session) {
    getQueryClient().clear();
    return redirect("/login");
  }

  return {
    dehydratedState: dehydrate(queryClient),
  };
}

let isInitialRequest = true;

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  if (isInitialRequest) {
    isInitialRequest = false;
    return await serverLoader();
  }
  // Prevent calling the server loader during client-side search/navigation
  return { dehydratedState: undefined };
}

clientLoader.hydrate = true as const;

export default function DashboardLayout({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  const { dehydratedState } = loaderData;

  const { data: session } = useQuery(sessionQueryOption());

  if (!session) redirect("/login");

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="bg-base-100 flex min-h-screen w-full overflow-hidden">
        <Sidebar></Sidebar>

        {/* Navbar and Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Navbar></Navbar>

          <main className="bg-base-200 relative m-0 flex-1 overflow-y-auto rounded-xl md:m-4 md:mt-0 md:ml-0">
            {isNavigating ? (
              <LoadingSpinner />
            ) : (
              <Outlet context={{ session }}></Outlet>
            )}
          </main>

          <Dock></Dock>
        </div>
      </div>
    </HydrationBoundary>
  );
}
