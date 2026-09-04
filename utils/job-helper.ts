import { Prisma } from "@/prisma/generated/prisma/client";
import { DatabaseResponse } from "@/types/global.type";

export function handleDatabaseErrorResponse<T>({
  error,
  customStatusText,
}: {
  error: unknown;
  customStatusText?: string;
}): DatabaseResponse<T> {
  let message = "An unknown error occurred";
  let statusText = customStatusText || "Internal Server Error";

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    message = error.message;
    statusText = error.name;
  } else if (error instanceof Error) {
    message = error.message;
    statusText = customStatusText ?? error.name;
  }

  return { success: false, statusText, message, data: null };
}
