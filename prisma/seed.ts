import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: {
      username: "oussama",
    },
    create: {
      username: "oussama",
      passwordHash: await argon2.hash("password"),
    },
    update: {},
  });

  await prisma.test.create({
    data: {
      example: "test data",
      userId: user.id,
    },
  });
}

main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
