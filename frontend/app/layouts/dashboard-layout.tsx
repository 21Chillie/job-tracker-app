import { Outlet, redirect, useNavigation } from "react-router";
import Sidebar from "@components/sidebar/Sidebar";
import Navbar from "@components/navbar/Navbar";
import Dock from "@components/dock/Dock";
import type { Route } from "./+types/dashboard-layout";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import queryClientConfig from "@configs/query-client.config";
import authService from "@services/auth.service";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await authService.getSession(request);

  if (!session) {
    return redirect("/login");
  }

  return { user: session.user };
}

export default function DashboardLayout({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigation();
  const pageIsLoading = navigate.state === "loading";
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return (
    <>
      <div className="bg-base-100 flex min-h-screen w-full overflow-hidden">
        <Sidebar></Sidebar>

        {/* Navbar and Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Navbar user={loaderData.user}></Navbar>

          <main className="bg-base-200 relative m-0 flex-1 overflow-y-auto rounded-xl md:m-4 md:mt-0 md:ml-0">
            {pageIsLoading ? (
              <div className="absolute inset-100 grid place-items-center">
                <span className="loading loading-spinner text-primary"></span>
              </div>
            ) : (
              <div className="mx-auto max-w-6xl space-y-6">
                <QueryClientProvider client={queryClient}>
                  <Outlet context={loaderData.user}></Outlet>
                </QueryClientProvider>
              </div>
            )}
          </main>

          <Dock></Dock>
        </div>
      </div>
    </>
  );
}
