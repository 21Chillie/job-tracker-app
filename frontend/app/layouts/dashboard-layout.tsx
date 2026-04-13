import { Outlet, redirect } from "react-router";
import Sidebar from "~/components/sidebar/Sidebar";
import Navbar from "~/components/navbar/Navbar";
import authClient from "~/utils/auth/auth-client";
import type { Route } from "./+types/dashboard-layout";

export async function clientLoader() {
  const { data: session, error } = await authClient.getSession();

  // Debug remove it later
  console.log(`Session Data: ${session?.user.id.slice(0,10)}...`);

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

export default function DashboardLayout({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <div className="bg-base-100 flex min-h-screen w-full overflow-hidden">
        <Sidebar></Sidebar>

        {/* Navbar and Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Navbar user={loaderData.user}></Navbar>
          <main className="bg-base-200 m-3 flex-1 overflow-y-auto rounded-xl md:m-4 md:mt-0 md:ml-0">
            <div className="mx-auto max-w-6xl space-y-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
