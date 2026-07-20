import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'rishabh.j.tripathi2903@gmail.com';
  
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    console.log(`User with email ${email} not found.`);
    return;
  }

  const updatedUser = await prisma.user.update({
    where: { email },
    data: { role: 'admin' }
  });

  console.log(`Successfully updated ${email} to admin role. New role: ${updatedUser.role}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
