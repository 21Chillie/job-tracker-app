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
import "./app.css";
import { Toaster } from "react-hot-toast";

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
        <Toaster
          toastOptions={{
            success: {
              className:
                "!text-base-content !font-medium !bg-base-100 !border !border-base-300 !shadow-md",
            },
            error: {
              className:
                "!text-base-content !font-medium !bg-base-100 !border !border-base-300 !shadow-md",
            },
          }}
        />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="bg-base-200 grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <section id="error-section" className="w-full max-w-2xl text-center">
        <header className="mb-8">
          <p className="text-primary text-base font-semibold">
            There was an error
          </p>
          <h1 className="text-base-content mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            {message || "Something went wrong"}
          </h1>
          <p className="text-base-content/60 mt-6 text-base leading-7 text-pretty">
            {details}
          </p>
        </header>

        <div className="mb-10 flex items-center justify-center gap-x-6">
          <Link
            className="group text-primary/80 hover:text-primary inline-flex flex-col font-medium transition-colors"
            to="/"
          >
            Back Home
            <div className="bg-primary h-0.5 scale-x-0 transition-transform group-hover:scale-x-100"></div>
          </Link>
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
