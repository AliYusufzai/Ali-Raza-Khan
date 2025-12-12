import { prisma } from "../shared/database/prisma";
import { AppError } from "../shared/errors/appError";
import { getCurrentMonth } from "../shared/utils/helper";
import { NextFunction, Request, Response } from "express";

export const quotaMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.body.userId;
    if (!userId) throw new AppError("UserId is required", 400);

    const { month, year } = getCurrentMonth();
    const FREE_MESSAGES = 3;

    let freeQuota = await prisma.freeQuota.findUnique({ where: { userId } });

    if (!freeQuota) {
      freeQuota = await prisma.freeQuota.create({
        data: { userId, used: 0, month, year },
      });
    }

    if (freeQuota.used < FREE_MESSAGES) {
      await prisma.freeQuota.update({
        where: { userId },
        data: { used: { increment: 1 } },
      });
      return next();
    }

    // ---- Paid Bundles ----
    const bundles = await prisma.subscription.findMany({
      where: { userId, isActive: true, endDate: { gte: new Date() } },
      orderBy: { endDate: "desc" },
    });

    const bundle = bundles.find(
      (b) => b.maxMessages === null || b.usedMessages < b.maxMessages,
    );

    if (!bundle)
      throw new AppError(
        "No quota available, subscribe to our premium tiers",
        403,
      );

    await prisma.subscription.update({
      where: { id: bundle.id },
      data: { usedMessages: { increment: 1 } },
    });

    await prisma.bundleUsage.create({
      data: { userId, subscriptionId: bundle.id, count: 1 },
    });

    next();
  } catch (err) {
    next(err);
  }
};
