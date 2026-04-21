import type { FormJobDataType } from "~/hooks/job/useJobFom.hook";

export interface JobsDataType {
  id: string;
  user_id: string;
  job_title: string;
  company: string;
  job_url: string | null;
  job_status:
    | "applied"
    | "tested"
    | "interviewed"
    | "offer"
    | "accepted"
    | "rejected";
  applied_date: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type JobDataResponse = {
  success: true;
  data: {
    job: JobsDataType;
  };
};

export type JobsDataResponse = {
  success: true;
  data: {
    jobs: JobsDataType[];
    meta: {
      total: number;
      page: number;
      limit: number;
      maxPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
};

export type QueryJobsParams = {
  search: string;
  status: FormJobDataType["status"] | "all";
  sortBy: "created_at" | "job_title" | "applied_date";
  order: "asc" | "desc";
  page: number;
  limit: number;
};
