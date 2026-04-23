import { ArrowDown as Arrow } from "lucide-react";
import { useAppDispatch, useAppSelector } from "~/configs/store.config";
import { setSortBy, setSortOrder } from "~/features/job/jobFilterSlice";
import type { QueryJobsParams } from "~/types/job.type";

export default function SortFilter() {
  const { sortBy, order } = useAppSelector((state) => state.jobFilter);
  const dispatch = useAppDispatch();

  return (
    <fieldset className="fieldset col-span-2 md:col-span-1">
      <div className="dropdown dropdown-end w-fit">
        <button
          type="button"
          tabIndex={0}
          role="button"
          className="flex items-center gap-1 text-sm"
        >
          <p className="uppercase">
            Sort By:{" "}
            <span className="text-primary font-medium capitalize">
              {sortBy.replace("_", " ")}
            </span>
          </p>
          <span>
            <Arrow
              className={`${order === "desc" ? "rotate-0" : "rotate-180"} text-primary size-4 transition-all`}
            />
          </span>
        </button>

        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box border-base-content/15 z-1 mt-2 w-38 border p-2 shadow-lg"
        >
          {(
            [
              "applied_date",
              "created_at",
              "job_title",
            ] as QueryJobsParams["sortBy"][]
          ).map((sort) => {
            return (
              <li key={sort}>
                <button
                  type="button"
                  className="btn btn-ghost flex justify-start font-normal capitalize"
                  onClick={() => {
                    dispatch(setSortBy(sort));
                    dispatch(setSortOrder());
                    (document.activeElement as HTMLElement).blur();
                  }}
                >
                  {sort.replace("_", " ")}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </fieldset>
  );
}
