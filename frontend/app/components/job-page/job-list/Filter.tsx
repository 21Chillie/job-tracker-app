import { useAppDispatch } from "@configs/store.config";
import { setSearch } from "@features/job/jobFilterSlice";
import { Search } from "lucide-react";
import SortFilter from "./filter/SortFilter";
import StatusFilter from "./filter/StatusFilter";

export default function Filter() {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="flex items-center justify-between">
        <label className="input max-sm:input-sm focus-within:outline-primary/20 focus-within:border-primary/50 w-full md:w-fit">
          <span>
            <Search className="text-base-content/50 size-4" />
          </span>
          <input
            type="search"
            placeholder="Search position or company"
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
        </label>

        <div className="hidden items-center gap-6 md:flex">
          <StatusFilter />
          <SortFilter />
        </div>
      </div>
    </>
  );
}
