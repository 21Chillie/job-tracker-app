"use server";

import prisma from "@/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";

// * Get user email verified or not
export async function getUserEmail({
  email,
  emailVerified,
}: {
  email: string;
  emailVerified: boolean;
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
      return { success: true, message: "User not found", data: null };
    }

    return {
      success: true,
      message: "User found",
      data: result,
    };
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      return {
        success: false,
        message: `DATABASE ERROR: ${err.message}`,
        data: null,
      };
    }

    return {
      success: false,
      message: `UNKNOWN ERROR: Something went wrong on our end`,
      data: null,
    };
  }
}
