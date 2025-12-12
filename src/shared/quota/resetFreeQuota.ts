import { prisma } from "../database/prisma";

export async function resetFreeQuota() {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  await prisma.freeQuota.updateMany({
    data: {
      used: 0,
      month: currentMonth,
      year: currentYear,
    },
  });
}
