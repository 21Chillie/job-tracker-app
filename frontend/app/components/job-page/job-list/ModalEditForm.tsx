import { statusList } from "@components/job-page/add-job/statusList";
import { useEditJobForm } from "@hooks/job/useJobForm.hook";
import { ChevronDown, Link2 } from "lucide-react";
import { createPortal } from "react-dom";
import { useFetcher } from "react-router";
import type { JobsDataType } from "~/types/job.type";

export function ModalEditButton({ buttonModalId }: { buttonModalId: string }) {
  const handleOpen = () => {
    const modalSelect = document.getElementById(
      buttonModalId,
    ) as HTMLDialogElement | null;

    if (modalSelect) {
      modalSelect.showModal();
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-sm btn-soft btn-primary"
        onClick={() => handleOpen()}
      >
        Edit
      </button>
    </>
  );
}

export function ModalEditBody({
  modalId,
  data,
}: {
  modalId: string;
  data: JobsDataType;
}) {
  const {
    id,
    user_id: userId,
    job_title: position,
    company,
    job_url: jobUrl,
    job_status: status,
    applied_date: appliedDate,
    notes,
  } = data;

  const { handleSubmit, Field, Subscribe, reset } = useEditJobForm({
    id,
    userId,
    position,
    company,
    jobUrl: jobUrl || "",
    status,
    appliedDate,
    notes: notes || "",
  });

  const fetcher = useFetcher();

  if (typeof document === "undefined") return null;

  const handleFormSubmit = () => {
    handleSubmit();
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) modal.close();
  };

  return createPortal(
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        <header className="mb-4">
          <h3 className="text-lg font-bold">Edit Job</h3>
        </header>

        <fetcher.Form
          className="grid grid-cols-2 gap-3 max-md:max-h-96 max-md:overflow-y-auto max-md:pr-4"
          onSubmit={handleFormSubmit}
        >
          <Field name="position">
            {({ state, name, handleBlur, handleChange }) => {
              const { errors } = state.meta;

              return (
                <fieldset className="fieldset col-span-2 md:col-span-1">
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
            {({ state, handleChange }) => {
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
                                (document.activeElement as HTMLElement)?.blur();
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
                <fieldset className="fieldset col-span-2">
                  <legend className="fieldset-legend">Applications Date</legend>
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
              Reset to default
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
                  Save edit
                </button>
              )}
            </Subscribe>
          </div>
        </fetcher.Form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>,
    document.body,
  );
}
