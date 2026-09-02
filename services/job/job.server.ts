"use server";

import prisma from "@/lib/prisma";
import { Job } from "@/prisma/generated/prisma/client";
import { checkUserId } from "@/services/user/user-data.server";
import { DatabaseResponse } from "@/types/global.type";
import { JobFormSchemaType } from "@/types/job.type";
import { handleDatabaseErrorResponse } from "@/utils/global-helper";

// TODO: remove the log later
export async function addUserJob({
  userId,
  formData,
}: {
  userId: string;
  formData: JobFormSchemaType;
}): Promise<DatabaseResponse<Job>> {
  console.log("Adding job...");

  try {
    const result = await prisma.$transaction(async (tx) => {
      const session = await checkUserId(userId);
      if (!session.success) throw new Error(session.message);

      return await tx.job.create({
        data: {
          ...formData,
          userId,
        },
      });
    });

    console.log(result);

    return {
      success: true,
      statusText: "Add Job Success",
      message: "Your job application has been submitted successfully",
      data: result,
    };
  } catch (error) {
    return handleDatabaseErrorResponse({
      error,
      customStatusText: "Add Job Failed",
    });
  }
}
