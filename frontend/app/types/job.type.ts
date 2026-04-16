export interface JobsApplicationFormType {
  fJobTitle: string;
  fCompany: string;
  fJobUrl: string;
  fJobStatus:
    | "applied"
    | "tested"
    | "interviewed"
    | "offer"
    | "accepted"
    | "rejected";
  fAppliedDate: string;
  fNotes: string;
}

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

export type JobsApiResponse = {
  success: true;
  data: JobsDataType;
};
