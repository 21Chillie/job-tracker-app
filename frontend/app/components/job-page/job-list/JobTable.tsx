import { dataJobsPlaceholder } from "./dataPlaceholder";
import { TableRow } from "./TableRow";

export function JobTable() {
  return (
    <>
      <section id="job-table-section" className="p-4 max-sm:mb-4 md:p-6">
        <article className="border-base-300 bg-base-100 rounded-box border shadow-xl">
          <div className="overflow-x-auto pb-4">
            <table className="table-sm md:table-md table min-w-4xl max-sm:min-w-3xl">
              {/* table head */}
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <th>Position</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th>Date Applied</th>
                  <th>Recently Added</th>
                  <th>Action</th>
                </tr>
              </thead>

              {/* table body */}
              <tbody>
                {dataJobsPlaceholder.map((job, i) => {
                  if (i > 14) {
                    return null;
                  }

                  return <TableRow key={i} {...job} />;
                })}
              </tbody>
            </table>
          </div>

          {/* TODO: change this later */}
          <div className="flex items-center justify-between px-4 py-3 md:px-6">
            <p className="text-sm">15 of 100 results</p>

            <div className="btn-group">
              <button className="btn btn-sm">Previous</button>
              <button className="btn btn-sm">Next</button>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
