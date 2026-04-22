import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { QueryJobsParams } from "~/types/job.type";

const initialState: QueryJobsParams = {
  search: "",
  status: "all",
  sortBy: "applied_date",
  order: "desc",
  page: 1,
  limit: 13,
};

const jobFilterSlice = createSlice({
  name: "jobFilter",
  initialState,
  reducers: {
    clearFilter: (state) => {
      return initialState;
    },

    setSortOrder: (state) => {
      state.order = state.order === "desc" ? "asc" : "desc";
    },

    setSortBy: (state, action: PayloadAction<QueryJobsParams["sortBy"]>) => {
      state.sortBy = action.payload;
    },

    setNextPage: (state) => {
      state.page += 1;
    },

    setPrevPage: (state) => {
      if (state.page <= 1) {
        state.page = 1;
      } else {
        state.page -= 1;
      }
    },

    setStatus: (state, action: PayloadAction<QueryJobsParams["status"]>) => {
      state.status = action.payload;
    },

    setSearch: (state, action: PayloadAction<QueryJobsParams["search"]>) => {
      state.search = action.payload;
    },
  },
});

export const {
  clearFilter,
  setSortOrder,
  setSortBy,
  setNextPage,
  setPrevPage,
  setStatus,
  setSearch,
} = jobFilterSlice.actions;

export default jobFilterSlice.reducer;
