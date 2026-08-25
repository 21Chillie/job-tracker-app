"use server";

import prisma from "@/lib/prisma";
import { UserRoleType } from "@/types/auth.type";

export async function updateUserRole({
  id,
  email,
  role = "JOB_SEEKER",
}: {
  id: string;
  email: string;
  role?: UserRoleType;
}) {
  try {
    if (email === process.env.ADMIN_EMAIL) {
      await prisma.user.update({
        where: { id, email },
        data: { role: "ADMIN" },
      });
    } else {
      await prisma.user.update({
        where: { id, email },
        data: { role: role },
      });
    }
  } catch (err) {
    console.error("DATABASE ERROR:", err);
    throw err;
  }
}
