import type { JobsDataResponse } from "~/types/job.type";
import { dataJobsPlaceholder } from "./dataPlaceholder";
import { TableRow } from "./TableRow";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function JobTable({ data }: JobsDataResponse) {
  const { jobs, meta } = data;

  const { total, page, limit, maxPages, hasNextPage, hasPrevPage } = meta;

  return (
    <>
      <section id="job-table-section" className="p-4 max-sm:mb-4 md:p-6">
        <article className="border-base-300 bg-base-100 rounded-box border shadow-xl">
          <div className="overflow-x-auto pb-4">
            <table className="table-sm md:table-md table min-w-4xl max-sm:min-w-3xl">
              {/* table head */}
              <thead>
                <tr>
                  {/*<th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>*/}
                  <th>Position</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th>Date Applied</th>
                  <th>Action</th>
                </tr>
              </thead>

              {/* table body */}
              <tbody>
                {jobs.map((job, i) => {
                  return <TableRow key={i} {...job} />;
                })}
              </tbody>
            </table>
          </div>

          {/* TODO: change this later */}
          {dataJobsPlaceholder.length > 0 ? (
            <div className="flex items-center justify-between px-4 py-3 md:px-6">
              <p className="label text-sm whitespace-normal">
                {`${jobs.length}  of ${total} results`}
              </p>

              <div className="join">
                <button type="button" className="join-item btn btn-sm btn-soft">
                  <span>
                    <ChevronLeft className="text-base-content/60 size-4" />
                  </span>
                </button>

                <button type="button" className="join-item btn btn-sm btn-soft">
                  <p>{`${page} / ${maxPages}`}</p>
                </button>

                <button type="button" className="join-item btn btn-sm btn-soft">
                  <span>
                    <ChevronRight className="text-base-content/60 size-4" />
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="px-4 py-3 text-center md:px-6">
              <p className="label text-sm whitespace-normal">
                No data has been added yet
              </p>
            </div>
          )}
        </article>
      </section>
    </>
  );
}
