import type { FormJobDataType } from "~/hooks/job/useJobFom.hook";

export const statusList: FormJobDataType["status"][] = [
  "applied",
  "tested",
  "interviewed",
  "offer",
  "accepted",
  "rejected",
];
