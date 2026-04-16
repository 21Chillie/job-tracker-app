import db from "@db/db-client";
import logger from "@config/logger";
import { JobApplicationFormDataType } from "~/types/jobs.types";

const jobsModel = {
  create: async (userId: string, data: JobApplicationFormDataType) => {
    const id = Bun.randomUUIDv7();
    const { fJobTitle, fCompany, fJobUrl, fJobStatus, fAppliedDate, fNotes } =
      data;

    const query = db.query(
      "INSERT INTO jobs (id, user_id, job_title, company, job_url, job_status, applied_date, notes) VALUES ($id, $user_id, $job_title, $company, $job_url, $job_status, $applied_date, $notes) RETURNING *;",
    );

    try {
      const result = query.get({
        id,
        user_id: userId,
        job_title: fJobTitle,
        company: fCompany,
        job_url: fJobUrl || null,
        job_status: fJobStatus,
        applied_date: fAppliedDate,
        notes: fNotes || null,
      });

      logger.info(
        `Job created successfully. [${id}, ${userId.slice(0, 10)}...]`,
      );

      return result;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  },
};

export default jobsModel;
