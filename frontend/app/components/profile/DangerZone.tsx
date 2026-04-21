import { useFetcher } from "react-router";
import { useState } from "react";
import { Eye, EyeOff, KeyRound } from "lucide-react";

export default function DangerZone() {
  const [viewPassword, setViewNewPassword] = useState(false);
  const fetcher = useFetcher();
  // const busy = fetcher.state !== "idle";

  return (
    <>
      <section id="dangerous-zone" className="px-4 pb-4 md:px-6 md:pb-6">
        <div className="bg-base-100 border-base-300 mx-auto max-w-4xl space-y-3 rounded-xl border py-4 shadow-md max-sm:mb-4 md:py-6">
          <header className="border-b-base-300 space-y-1 border-b px-4 pb-3 md:px-6">
            <div className="badge badge-soft badge-error badge-sm">
              Danger Zone
            </div>
            <h2 className="text-2xl leading-relaxed font-semibold">
              Delete Account
            </h2>
            <p className="text-base-content/60 text-xs font-medium text-pretty md:text-sm">
              Once you delete your account, there is no going back. This will
              permanently remove all your data, including your job applications
              and profile information. Please be certain.
            </p>
          </header>

          <fetcher.Form
            method="POST"
            className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-6"
          >
            <fieldset className="fieldset col-span-2 md:col-span-1">
              <legend className="fieldset-legend">Password</legend>
              <div className="input max-sm:input-sm focus-within:outline-primary/20 focus-within:border-primary/50 w-full">
                <span>
                  <KeyRound className="text-base-content/50 size-4" />
                </span>
                <input
                  className="grow"
                  type={viewPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Type your new password here"
                />

                <button
                  type="button"
                  onClick={() => setViewNewPassword(!viewPassword)}
                >
                  {viewPassword ? (
                    <EyeOff className="text-base-content/50 size-4" />
                  ) : (
                    <Eye className="text-base-content/50 size-4" />
                  )}
                </button>
              </div>

              <p className="label whitespace-normal">Required</p>
            </fieldset>

            <div className="flex w-full items-center justify-end">
              <button
                className="btn btn-error btn-soft"
                type="submit"
                name="action"
                value={"delete-account"}
              >
                Delete account
              </button>
            </div>
          </fetcher.Form>
        </div>
      </section>
    </>
  );
}
