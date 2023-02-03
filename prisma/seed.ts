import * as process from 'node:process';

import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seeder(): Promise<void> {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('Only available in development mode.');
  }

  await prisma.$transaction([
    prisma.user.deleteMany(),
    prisma.projectPreference.deleteMany(),
  ]);

  const developmentUser = await prisma.user.create({
    data: {
      username: 'Developer'.toLowerCase(),
    },
  });

  const promises = [];
  for (let index = 0; index < 10; index++) {
    promises.push(
      prisma.projectPreference.create({
        data: {
          name: faker.lorem.word(),
          user: {
            connect: {
              id: developmentUser.id,
            },
          },
        },
      }),
    );
  }

  await prisma.$transaction(promises);
}

seeder()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
  });
