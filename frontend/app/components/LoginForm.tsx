import { LuSmile, LuMail, LuKeyRound, LuEye, LuEyeOff } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import { useState } from "react";

function LoginForm() {
  const [viewPassword, setViewpassword] = useState<boolean>(false);

  return (
    <>
      <article className="bg-base-100 border-base-300 card mx-auto w-full max-w-md border shadow-lg max-sm:fixed max-sm:inset-0">
        <header className="border-base-300 flex items-start gap-2 border-b p-6">
          <div>
            <LuSmile className="size-6" />
          </div>

          <div>
            <h3 className="text-xl font-medium">Welcome back!</h3>
            <p className="text-base-content/70 text-sm text-pretty">
              Ready to check and manage your job application? Please enter your
              details below!
            </p>
          </div>
        </header>

        <form className="pt-4 pb-6">
          <div className="mb-4 space-y-1 px-6">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <label className="input focus-within:outline-primary/20 focus-within:border-primary/50 w-full">
                <span>
                  <LuMail className="text-base-content/50 size-4" />
                </span>
                <input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Type your email here"
                  required
                />
              </label>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <label className="input focus-within:outline-primary/20 focus-within:border-primary/50 w-full">
                <span>
                  <LuKeyRound className="text-base-content/50 size-4" />
                </span>
                <input
                  name="password"
                  id="password"
                  type={viewPassword ? "text" : "password"}
                  placeholder="Type your password here"
                  required
                />

                <button
                  type="button"
                  onClick={() => setViewpassword(!viewPassword)}
                >
                  {viewPassword ? <LuEyeOff /> : <LuEye />}
                </button>
              </label>
              <p className="label">
                Must be 8+ characters, includes uppercase and number.
              </p>
            </fieldset>
          </div>

          <div className="space-y-4 px-6">
            <button type="submit" className="btn btn-primary btn-block">
              Login with email
            </button>

            <div className="flex items-center gap-3">
              <div className="bg-base-content/30 h-px w-full"></div>
              <p className="text-base-content/50 shrink-0 text-[11px]">
                Or continue with Google
              </p>
              <div className="bg-base-content/30 h-px w-full"></div>
            </div>

            <button className="btn btn-block">
              <span>
                <FcGoogle />
              </span>
              Login with Google account
            </button>
          </div>
        </form>

        <div className="p-6 text-center">
          <p className="text-base-content text-sm">
            Dont have an account?{" "}
            <Link
              className="text-primary font-medium underline"
              to={"/register"}
            >
              Register
            </Link>
          </p>
        </div>
      </article>
    </>
  );
}

export default LoginForm;
