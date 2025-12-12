import { prisma } from "../../shared/database/prisma";

export class ChatRepository {
  async create(data: {
    userId: string;
    question: string;
    answer: string;
    tokens: number;
  }) {
    return prisma.chatMessage.create({ data });
  }

  async findByUser(userId: string) {
    return prisma.chatMessage.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }
}
