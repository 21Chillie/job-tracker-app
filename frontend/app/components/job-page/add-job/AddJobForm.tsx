import { ChevronDown, Link2 } from "lucide-react";
import { useFetcher } from "react-router";
import { useJobForm } from "~/hooks/job/useJobForm.hook";
import { statusList } from "./statusList";

export default function AddJobForm() {
  const { handleSubmit, Field, Subscribe, reset } = useJobForm();
  const fetcher = useFetcher();

  return (
    <>
      <section id="section-job-form" className="p-4 md:p-6">
        <div className="bg-base-100 border-base-300 mx-auto max-w-4xl space-y-3 rounded-xl border py-4 shadow-md max-sm:mb-4 md:py-6">
          <header className="border-b-base-300 space-y-1 border-b px-4 pb-3 md:px-6">
            <div className="badge badge-soft badge-primary badge-sm">
              New Entry
            </div>
            <h2 className="text-2xl leading-relaxed font-semibold">
              Curate Opportunity
            </h2>
            <p className="text-base-content/60 text-xs font-medium text-pretty md:text-sm">
              Keep your momentum going. Enter the role details to start tracking
              your progress.
            </p>
          </header>

          {/* NOTE: `f` in id and name input mean is `form` */}
          <fetcher.Form
            className="grid grid-cols-2 gap-3 px-4 md:px-6"
            onSubmit={handleSubmit}
          >
            <Field name="position">
              {({ state, name, handleBlur, handleChange }) => {
                const { errors } = state.meta;

                return (
                  <fieldset className="fieldset col-span-2">
                    <legend className="fieldset-legend">Position</legend>
                    <input
                      type="text"
                      id={name}
                      name={name}
                      className="input input-sm md:input-md focus-within:outline-primary/20 focus-within:border-primary/50 w-full"
                      placeholder="e.g. Fullstack Web Developer"
                      value={state.value}
                      onBlur={handleBlur}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                    {errors.length > 0 ? (
                      <div className="space-y-1">
                        {errors.map((error, index) => (
                          <p
                            key={`fieldPositionErr${index}`}
                            className="label text-error whitespace-normal"
                          >
                            {error?.message}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="label whitespace-normal">Required</p>
                    )}
                  </fieldset>
                );
              }}
            </Field>

            <Field name="company">
              {({ state, name, handleBlur, handleChange }) => {
                const { errors } = state.meta;

                return (
                  <fieldset className="fieldset col-span-2 md:col-span-1">
                    <legend className="fieldset-legend">Company</legend>
                    <input
                      type="text"
                      id={name}
                      name={name}
                      className="input input-sm md:input-md focus-within:outline-primary/20 focus-within:border-primary/50 w-full"
                      placeholder="e.g. CD Projekt Red"
                      value={state.value}
                      onBlur={handleBlur}
                      onChange={(e) => handleChange(e.target.value)}
                    />

                    {errors.length > 0 ? (
                      <div className="space-y-1">
                        {errors.map((error, index) => (
                          <p
                            key={`fieldPositionErr${index}`}
                            className="label text-error whitespace-normal"
                          >
                            {error?.message}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="label whitespace-normal">Required</p>
                    )}
                  </fieldset>
                );
              }}
            </Field>

            <Field name="jobUrl">
              {({ state, name, handleBlur, handleChange }) => {
                const { errors } = state.meta;

                return (
                  <fieldset className="fieldset col-span-2 md:col-span-1">
                    <legend className="fieldset-legend">Job Posting URL</legend>
                    <label className="input input-sm md:input-md focus-within:outline-primary/20 focus-within:border-primary/50 w-full">
                      <Link2 className="text-base-content/50 size-4" />
                      <input
                        type="text"
                        id={name}
                        name={name}
                        className="grow"
                        placeholder="https://www.linkedin.com/jobs/..."
                        value={state.value}
                        onBlur={handleBlur}
                        onChange={(e) => handleChange(e.target.value)}
                      />
                    </label>

                    {errors.length > 0 && (
                      <div className="space-y-1">
                        {errors.map((error, index) => (
                          <p
                            key={`fieldPositionErr${index}`}
                            className="label text-error whitespace-normal"
                          >
                            {error?.message}
                          </p>
                        ))}
                      </div>
                    )}
                  </fieldset>
                );
              }}
            </Field>

            <Field name="status">
              {({ state, name, handleBlur, handleChange }) => {
                const { errors } = state.meta;

                return (
                  <fieldset className="fieldset col-span-2 md:col-span-1">
                    <legend className="fieldset-legend">Status</legend>

                    <div className="dropdown w-full">
                      <button
                        type="button"
                        tabIndex={0}
                        className="btn btn-sm md:btn-md border-base-content/20 bg-base-100 flex w-full justify-between font-normal"
                      >
                        <span className="capitalize">{state.value}</span>
                        <span>
                          <ChevronDown className="text-base-content/50 size-4" />
                        </span>
                      </button>

                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box border-base-content/15 z-1 mt-1 w-full border p-2 shadow-lg"
                      >
                        {statusList.map((status) => {
                          return (
                            <li key={status}>
                              <button
                                type="button"
                                className={`btn btn-block flex justify-start font-normal capitalize ${state.value === status ? "" : "btn-ghost"}`}
                                onClick={() => {
                                  handleChange(status);

                                  // Close dropdown after click
                                  (
                                    document.activeElement as HTMLElement
                                  )?.blur();
                                }}
                              >
                                {status}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {errors.length > 0 && (
                      <div className="space-y-1">
                        {errors.map((error, index) => (
                          <p
                            key={`fieldPositionErr${index}`}
                            className="label text-error whitespace-normal"
                          >
                            {error?.message}
                          </p>
                        ))}
                      </div>
                    )}
                  </fieldset>
                );
              }}
            </Field>

            <Field name="appliedDate">
              {({ state, name, handleBlur, handleChange }) => {
                const { errors } = state.meta;

                return (
                  <fieldset className="fieldset col-span-2 md:col-span-1">
                    <legend className="fieldset-legend">
                      Applications Date
                    </legend>
                    <input
                      id={name}
                      name={name}
                      type="date"
                      className="input input-sm md:input-md focus-within:outline-primary/20 focus-within:border-primary/50 w-full"
                      value={state.value}
                      onBlur={handleBlur}
                      onChange={(e) => handleChange(e.target.value)}
                    />

                    {errors.length > 0 && (
                      <div className="space-y-1">
                        {errors.map((error, index) => (
                          <p
                            key={`fieldPositionErr${index}`}
                            className="label text-error whitespace-normal"
                          >
                            {error?.message}
                          </p>
                        ))}
                      </div>
                    )}
                  </fieldset>
                );
              }}
            </Field>

            <Field name="notes">
              {({ state, name, handleBlur, handleChange }) => {
                const { errors } = state.meta;

                return (
                  <fieldset className="fieldset col-span-2">
                    <legend className="fieldset-legend">Notes</legend>
                    <textarea
                      id={name}
                      name={name}
                      className="textarea textarea-sm md:textarea-md focus-within:outline-primary/20 focus-within:border-primary/50 h-32 w-full p-3 md:p-4"
                      placeholder="Briefly describe the role, salary range, or interview contacts..."
                      value={state.value}
                      onBlur={handleBlur}
                      onChange={(e) => handleChange(e.target.value)}
                    ></textarea>

                    {errors.length > 0 ? (
                      <div className="space-y-1">
                        {errors.map((error, index) => (
                          <p
                            key={`fieldPositionErr${index}`}
                            className="label text-error whitespace-normal"
                          >
                            {error?.message}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="label whitespace-normal">
                        {state?.value?.length ?? "0"}/500 characters
                      </p>
                    )}
                  </fieldset>
                );
              }}
            </Field>

            <div className="col-span-2 mt-6 flex flex-wrap justify-end gap-4">
              <button
                type="button"
                onClick={() => reset()}
                className="btn btn-ghost"
              >
                Clear
              </button>

              <Subscribe
                selector={(state) => [state.isSubmitting, state.canSubmit]}
              >
                {([isSubmitting, canSubmit]) => (
                  <button
                    type="submit"
                    disabled={isSubmitting || !canSubmit}
                    className="btn btn-primary"
                  >
                    {isSubmitting ? (
                      <span className="loading loading-spinner"></span>
                    ) : null}{" "}
                    Add opportunity
                  </button>
                )}
              </Subscribe>
            </div>
          </fetcher.Form>
        </div>
      </section>
    </>
  );
}
