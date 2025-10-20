import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing all products from database...');

  const deleted = await prisma.product.deleteMany({});

  console.log(`✅ Deleted ${deleted.count} products from database`);
}

main()
  .catch((e) => {
    console.error('Error clearing database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
