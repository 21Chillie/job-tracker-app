import { LuSmile, LuMail, LuKeyRound, LuEye, LuEyeOff } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import { useState } from "react";
import { useLoginForm } from "@hooks/auth/login.hook";
import handleGoogleOauth from "@utils/auth/google-oauth";

function LoginForm() {
  const [viewPassword, setViewpassword] = useState<boolean>(false);
  const { handleSubmit, Subscribe, Field } = useLoginForm();

  const handleLoginForm = (e: React.SubmitEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit();
  };

  return (
    <>
      <article className="bg-base-100 border-base-300 card mx-auto w-full border shadow-lg max-sm:fixed max-sm:inset-0 sm:max-w-md">
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

        <form className="pt-4 pb-6" onSubmit={handleLoginForm}>
          <div className="mb-4 space-y-1 px-6">
            <Field name="email">
              {(field) => {
                const { errors, isTouched } = field.state.meta;

                return (
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Email</legend>
                    <label className="input focus-within:outline-primary/20 focus-within:border-primary/50 w-full">
                      <span>
                        <LuMail className="text-base-content/50 size-4" />
                      </span>
                      <input
                        name={field.name}
                        id={field.name}
                        type="email"
                        placeholder="Type your email here"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </label>

                    {errors.length > 0 && isTouched && (
                      <div className="space-y-1">
                        {errors.map((error, index) => (
                          <p className="text-error label" key={index}>
                            {error?.message}
                          </p>
                        ))}
                      </div>
                    )}
                  </fieldset>
                );
              }}
            </Field>

            <Field name="password">
              {(field) => {
                const { errors, isTouched } = field.state.meta;

                return (
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Password</legend>
                    <label className="input focus-within:outline-primary/20 focus-within:border-primary/50 w-full">
                      <span>
                        <LuKeyRound className="text-base-content/50 size-4" />
                      </span>
                      <input
                        name={field.name}
                        id={field.name}
                        type={viewPassword ? "text" : "password"}
                        placeholder="Type your password here"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />

                      <button
                        type="button"
                        onClick={() => setViewpassword(!viewPassword)}
                      >
                        {viewPassword ? <LuEyeOff /> : <LuEye />}
                      </button>
                    </label>

                    {errors.length > 0 && isTouched ? (
                      <div>
                        {errors.map((error, index) => (
                          <p key={index} className="text-error label">
                            {error?.message}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="label">
                        Must be 8+ characters, includes uppercase and number.
                      </p>
                    )}
                  </fieldset>
                );
              }}
            </Field>
          </div>

          <div className="space-y-4 px-6">
            <Subscribe
              selector={(state) => [state.isSubmitting, state.canSubmit]}
            >
              {([isSubmitting, canSubmit]) => (
                <button
                  type="submit"
                  disabled={isSubmitting || !canSubmit}
                  className="btn btn-primary btn-block"
                >
                  {isSubmitting ? (
                    <span className="loading loading-spinner"></span>
                  ) : null}{" "}
                  Login with email
                </button>
              )}
            </Subscribe>

            <div className="flex items-center gap-3">
              <div className="bg-base-content/30 h-px w-full"></div>
              <p className="text-base-content/50 shrink-0 text-[11px]">
                Or continue with Google
              </p>
              <div className="bg-base-content/30 h-px w-full"></div>
            </div>

            <button
              type="button"
              className="btn btn-block"
              onClick={() => handleGoogleOauth()}
            >
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
