import type { FormJobDataType } from "~/hooks/job/useJobForm.hook";

export const statusList: FormJobDataType["status"][] = [
  "applied",
  "tested",
  "interviewed",
  "offer",
  "accepted",
  "rejected",
];
