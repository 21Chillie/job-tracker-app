import { Outlet, redirect, useNavigation } from "react-router";
import Sidebar from "@components/sidebar/Sidebar";
import Navbar from "@components/navbar/Navbar";
// import authClient from "@utils/auth/auth-client";
import Dock from "@components/dock/Dock";
import type { Route } from "./+types/dashboard-layout";
import { getUserSession } from "~/utils/auth/get-session";

/**
 * The code below is for get user session on client side
 * Longer code and not good practice

    export async function clientLoader() {
      const { data: session, error } = await authClient.getSession();

      if (!session || error) {
        console.log(error);
        return redirect("/login");
      }

      const user = {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      };

      return { user };
    }

    export function HydrateFallback() {
      return (
        <>
          <div className="bg-base-100 flex min-h-screen w-screen flex-col">
            <main className="bg-base-200 m-3 grid flex-1 place-items-center rounded-xl">
              <span className="loading loading-spinner text-primary"></span>
            </main>
          </div>
        </>
      );
    }
 */

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUserSession(request);

  if (!user) {
    return redirect("/login");
  }

  return { user };
}

export default function DashboardLayout({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigation();
  const pageIsLoading = navigate.state === "loading";

  return (
    <>
      <div className="bg-base-100 flex min-h-screen w-full overflow-hidden">
        <Sidebar></Sidebar>

        {/* Navbar and Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Navbar user={loaderData.user}></Navbar>

          <main className="bg-base-200 m-0 flex-1 overflow-y-auto rounded-xl md:m-4 md:mt-0 md:ml-0">
            <div className="relative mx-auto max-w-6xl space-y-6">
              {pageIsLoading ? (
                <div className="absolute inset-100 grid place-items-center">
                  <span className="loading loading-spinner text-primary"></span>
                </div>
              ) : (
                <Outlet context={loaderData.user}></Outlet>
              )}
            </div>
          </main>

          <Dock></Dock>
        </div>
      </div>
    </>
  );
}
