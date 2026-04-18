import { LuLink2 } from "react-icons/lu";
import { Form, useFetcher } from "react-router";

export default function AddJobForm() {
  const todayDate = new Date().toISOString().split("T")[0];
  const fetcher = useFetcher();
  const busy = fetcher.state !== "idle";

  return (
    <>
      <section
        id="section-job-form"
        className="bg-base-100 border-base-300 m-3 max-w-4xl space-y-3 rounded-xl border py-4 shadow-md max-sm:mb-16 md:m-4 md:py-6 xl:mx-auto"
      >
        <header className="border-b-base-300 space-y-1 border-b px-4 pb-3 md:px-6">
          <div className="badge badge-soft badge-primary badge-sm">
            New Entry
          </div>
          <h2 className="text-2xl font-semibold">Curate Opportunity</h2>
          <p className="text-base-content/60 text-xs font-medium text-pretty md:text-sm">
            Keep your momentum going. Enter the role details to start tracking
            your progress.
          </p>
        </header>

        {/* NOTE: `f` in id and name input mean is `form` */}
        <fetcher.Form
          method="POST"
          className="grid grid-cols-2 gap-3 px-4 md:px-6"
        >
          <fieldset className="fieldset col-span-2">
            <legend className="fieldset-legend">Position</legend>
            <input
              type="text"
              id="fJobTitle"
              name="fJobTitle"
              className="input input-sm md:input-md focus-within:outline-primary/20 focus-within:border-primary/50 w-full"
              placeholder="e.g. Fullstack Web Developer"
              required
            />
            <p className="label whitespace-normal">Required</p>
          </fieldset>

          <fieldset className="fieldset col-span-2 md:col-span-1">
            <legend className="fieldset-legend">Company</legend>
            <input
              type="text"
              id="fCompany"
              name="fCompany"
              className="input input-sm md:input-md focus-within:outline-primary/20 focus-within:border-primary/50 w-full"
              placeholder="e.g. CD Projekt Red"
              required
            />
            <p className="label whitespace-normal">Required</p>
          </fieldset>

          <fieldset className="fieldset col-span-2 md:col-span-1">
            <legend className="fieldset-legend">Job Posting URL</legend>
            <label className="input input-sm md:input-md focus-within:outline-primary/20 focus-within:border-primary/50 w-full">
              <LuLink2 className="text-base-content/50" />
              <input
                type="url"
                id="fJobUrl"
                name="fJobUrl"
                className="grow"
                placeholder="https://www.linkedin.com/jobs/..."
              />
            </label>
          </fieldset>

          <fieldset className="fieldset col-span-2 md:col-span-1">
            <legend className="fieldset-legend">Status</legend>
            <select
              id="fJobStatus"
              name="fJobStatus"
              defaultValue="Applied"
              className="select select-sm md:select-md focus-within:outline-primary/20 focus-within:border-primary/50 w-full"
            >
              <option value="applied">Applied</option>
              <option value="tested">Tested</option>
              <option value="interviewed">Interviewed</option>
              <option value="offer">Offer</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </fieldset>

          <fieldset className="fieldset col-span-2 md:col-span-1">
            <legend className="fieldset-legend">Applications Date</legend>
            <input
              id="fAppliedDate"
              name="fAppliedDate"
              type="date"
              className="input input-sm md:input-md focus-within:outline-primary/20 focus-within:border-primary/50 w-full"
              defaultValue={todayDate}
            />
          </fieldset>

          <fieldset className="fieldset col-span-2">
            <legend className="fieldset-legend">Notes</legend>
            <textarea
              id="fNotes"
              name="fNotes"
              className="textarea textarea-sm md:textarea-md focus-within:outline-primary/20 focus-within:border-primary/50 h-32 w-full p-3 md:p-4"
              placeholder="Briefly describe the role, salary range, or interview contacts..."
              maxLength={500}
            ></textarea>
          </fieldset>

          <div className="col-span-2 mt-6 flex flex-wrap justify-end gap-4">
            <button type="reset" className="btn btn-ghost max-sm:btn-sm">
              Clear
            </button>

            <button type="submit" className="btn btn-primary max-sm:btn-sm">
              {busy ? (
                <div>
                  <span className="loading loading-spinner"></span> Adding
                </div>
              ) : (
                "Add opportunity"
              )}
            </button>
          </div>
        </fetcher.Form>
      </section>
    </>
  );
}
