"use server";

import prisma from "@/lib/prisma";
import { DatabaseResponse } from "@/types/global.type";
import { handleDatabaseErrorResponse } from "@/utils/global-helper";
import { cacheLife, cacheTag } from "next/cache";

// * Get user email verified or not
export async function getUserEmail({
  email,
  emailVerified,
}: {
  email: string;
  emailVerified?: boolean;
}) {
  "use cache";
  cacheLife("weeks");
  cacheTag("user-email");

  try {
    const result = await prisma.user.findUnique({
      where: {
        email,
        emailVerified,
      },
      select: { email: true, emailVerified: true },
    });

    if (!result) {
      throw new Error("User not found");
    }

    return {
      success: true,
      message: "User found",
      data: result,
    };
  } catch (err) {
    let message = "UNKNOWN ERROR: Something went wrong on our end";

    if (err instanceof Error) {
      console.error(err);
      message = `DATABASE ERROR: ${err.message}`;
    }

    return {
      success: false,
      message,
      data: null,
    };
  }
}

export async function checkUserId(
  userId: string,
): Promise<DatabaseResponse<{ id: string; email: string }>> {
  try {
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },

      select: { id: true, email: true },
    });

    if (!data) throw new Error("User not found");

    return {
      success: true,
      statusText: "ID Found",
      message: "User ID checked successfully",
      data: data,
    };
  } catch (error) {
    return handleDatabaseErrorResponse({ error });
  }
}
