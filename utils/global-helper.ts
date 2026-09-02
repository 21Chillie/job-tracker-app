import { PrismaClientUnknownRequestError } from "@/prisma/generated/prisma/internal/prismaNamespace";
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

  if (error instanceof PrismaClientUnknownRequestError) {
    message = error.message;
    statusText = error.name;
  } else if (error instanceof Error) {
    message = error.message;
    statusText = customStatusText ?? error.name;
  }

  return { success: false, statusText, message, data: null };
}
