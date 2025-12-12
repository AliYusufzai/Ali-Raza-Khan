import { prisma } from "../database/prisma";

export async function createDefaultUserIfEmpty() {
  try {
    const userCount = await prisma.user.count();

    if (userCount === 0) {
      const newUser = await prisma.user.create({
        data: {
          email: "default@example.com",
        },
      });

      console.log(`Default user created with id: ${newUser.id}`);
    } else {
      console.log("Users already exist, skipping default user creation.");
    }
  } catch (err) {
    console.error("Error creating default user:", err);
  }
}
