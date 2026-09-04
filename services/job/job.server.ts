"use server";

import prisma from "@/lib/prisma";
import { ApplicationStatus, Job } from "@/prisma/generated/prisma/client";
import { checkUserId } from "@/services/user/user-data.server";
import { DatabaseResponse } from "@/types/global.type";
import { ApplicationStatusOptions, JobFormSchemaType } from "@/types/job.type";
import { handleDatabaseErrorResponse } from "@/utils/job-helper";
import { cacheLife, cacheTag, updateTag } from "next/cache";

export async function addUserJob({
  userId,
  formData,
}: {
  userId: string;
  formData: JobFormSchemaType;
}): Promise<DatabaseResponse<Job>> {
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
  } finally {
    updateTag("user-quick-stats");
  }
}

export async function userQuickStats({ userId }: { userId: string }): Promise<
  DatabaseResponse<{
    byStatus: { status: ApplicationStatus; count: number }[];
    total: number;
  } | null>
> {
  "use cache";
  cacheLife("max");
  cacheTag("user-quick-stats");

  try {
    const session = await checkUserId(userId);
    if (!session.success || !session.data) throw new Error(session.message);

    const res = await prisma.job.groupBy({
      by: ["status"],
      _count: true,
      where: {
        userId: session.data.id,
      },
    });

    const byStatus = ApplicationStatusOptions.map(({ value }) => {
      return {
        status: value,
        count: res.find((r) => r.status === value)?._count ?? 0,
      };
    });

    const total = byStatus.reduce((acc, curr) => acc + curr.count, 0);

    return {
      success: true,
      statusText: "User Quick Stats Success",
      message: "Your quick stats have been retrieved successfully",
      data: {
        byStatus,
        total,
      },
    };
  } catch (error) {
    return handleDatabaseErrorResponse({
      error,
      customStatusText: "User Quick Stats Failed",
    });
  }
}
