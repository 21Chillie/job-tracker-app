import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "~/app.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "@configs/store.config";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "@configs/query-client.config";
import { useState } from "react";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [queryClient] = useState(() => getQueryClient());

  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            className:
              "!text-base-content !font-medium !bg-base-100 !border !border-base-300 !shadow-md",
            iconTheme: {
              primary: "var(--color-primary)",
              secondary: "var(--color-primary-content)",
            },
          },
          error: {
            className:
              "!text-base-content !font-medium !bg-base-100 !border !border-base-300 !shadow-md",
            iconTheme: {
              primary: "var(--color-error)",
              secondary: "var(--color-error-content)",
            },
          },
        }}
      />

      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Provider store={store}>
          <Outlet />
        </Provider>
      </QueryClientProvider>
    </>
  );
}

const STATUS_MESSAGES: Record<number, string> = {
  401: "Unauthorized access, please login.",
  403: "You don't have the right to access this content.",
  404: "The page you are looking for could not be found.",
  407: "Proxy Authentication Required.",
  429: "Too many requests, please try again later.",
  500: "Something went wrong on our server.",
};

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let status = 500;
  let statusText = "Oops!";
  let message = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    if (import.meta.env.DEV) console.error("Route Error:", error);

    status = error.status;
    statusText = error.status === 404 ? "Not Found" : error.statusText;

    const customDataMessage =
      typeof error.data === "string" ? error.data : error.data?.message;

    message =
      customDataMessage || STATUS_MESSAGES[status] || STATUS_MESSAGES[500];
  } else if (error instanceof Error) {
    console.error("Runtime Error:", error);
    message = error.message;
    if (import.meta.env.DEV) {
      stack = error.stack;
    }
  }

  const isAuthError = [401, 403, 407].includes(status);

  return (
    <main className="bg-base-200 grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <section id="error-section" className="w-full max-w-2xl text-center">
        <header className="mb-8">
          <p className="text-primary text-base font-semibold">{status}</p>
          <h1 className="text-base-content mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            {statusText}
          </h1>
          <p className="text-base-content/60 mt-6 text-base leading-7 text-pretty">
            {message}
          </p>
        </header>

        <div className="mb-10 flex items-center justify-center gap-x-6">
          {isAuthError ? (
            <Link
              className="group text-primary/80 hover:text-primary inline-flex flex-col font-medium transition-colors"
              to="/login"
            >
              Back to login page
              <div className="bg-primary h-0.5 scale-x-0 transition-transform group-hover:scale-x-100"></div>
            </Link>
          ) : (
            <Link
              className="group text-primary/80 hover:text-primary inline-flex flex-col font-medium transition-colors"
              to="/"
            >
              Back Home
              <div className="bg-primary h-0.5 scale-x-0 transition-transform group-hover:scale-x-100"></div>
            </Link>
          )}
        </div>

        {stack && (
          <div className="mt-10 text-left">
            <p className="text-base-content/60 mb-2 font-mono text-xs font-bold tracking-widest uppercase">
              Technical Details
            </p>
            <div className="bg-base-300 rounded-xl p-4 shadow-2xl">
              <pre className="custom-scrollbar text-base-content/60 overflow-x-auto font-mono text-sm leading-relaxed whitespace-pre">
                <code className="block">{stack}</code>
              </pre>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
