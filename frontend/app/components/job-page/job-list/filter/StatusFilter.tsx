import { statusList } from "@components/job-page/add-job/statusList";
import { ChevronDown } from "lucide-react";
import { useAppDispatch, useAppSelector } from "~/configs/store.config";
import { setStatus } from "~/features/job/jobFilterSlice";

export default function StatusFilter() {
  const dispatch = useAppDispatch();
  const { status: CurrentStatus } = useAppSelector((state) => state.jobFilter);

  return (
    <fieldset className="fieldset col-span-2 md:col-span-1">
      <div className="dropdown dropdown-end w-fit">
        <button
          type="button"
          tabIndex={0}
          className="btn btn-sm md:btn-md border-base-content/20 bg-base-100 flex w-full justify-between font-normal"
        >
          <span className="capitalize">
            {CurrentStatus !== "all" ? CurrentStatus : "Status"}
          </span>
          <span>
            <ChevronDown className="text-base-content/50 size-4" />
          </span>
        </button>

        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box border-base-content/15 z-1 mt-1 min-w-32 border p-2 shadow-lg"
        >
          <li>
            <button
              type="button"
              className={`${CurrentStatus === "all" ? "" : "btn-ghost"} btn flex justify-start font-normal capitalize`}
              onClick={() => {
                dispatch(setStatus("all"));
                (document.activeElement as HTMLElement).blur();
              }}
            >
              All
            </button>
          </li>
          {statusList.map((status) => {
            return (
              <li key={status}>
                <button
                  type="button"
                  className={`${CurrentStatus === status ? "" : "btn-ghost"} btn flex justify-start font-normal capitalize`}
                  onClick={() => {
                    dispatch(setStatus(status));
                    (document.activeElement as HTMLElement).blur();
                  }}
                >
                  {status}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </fieldset>
  );
}
