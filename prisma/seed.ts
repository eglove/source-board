import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seeder() {
  await prisma.user.create({
    data: {
      username: 'Developer'.toLowerCase(),
    },
  });
}

seeder()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
  });
