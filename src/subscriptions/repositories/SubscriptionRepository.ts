import { prisma } from "../../shared/database/prisma";

export class SubscriptionRepository {
  async create(data: any) {
    return prisma.subscription.create({ data });
  }

  async findActiveByUser(userId: string) {
    return prisma.subscription.findMany({
      where: { userId, isActive: true, endDate: { gte: new Date() } },
      orderBy: { endDate: "desc" },
    });
  }

  async update(id: string, data: any) {
    return prisma.subscription.update({ where: { id }, data });
  }

  async findExpiring() {
    return prisma.subscription.findMany({
      where: {
        autoRenew: true,
        isActive: true,
        endDate: { lte: new Date() },
      },
    });
  }
}
