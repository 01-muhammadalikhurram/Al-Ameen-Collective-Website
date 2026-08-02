const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  let admin = await prisma.user.findUnique({ where: { username: 'admin' } });
  if (!admin) {
    admin = await prisma.user.create({
      data: { username: 'admin', password: adminPassword, role: 'ADMIN' },
    });
  }
  console.log('Admin created/exists:', admin.username);

  // Create Vendor
  const vendorPassword = await bcrypt.hash('vendor123', 10);
  let vendor = await prisma.user.findUnique({ where: { username: 'vendor' } });
  if (!vendor) {
    vendor = await prisma.user.create({
      data: { username: 'vendor', password: vendorPassword, role: 'VENDOR' },
    });
  }
  console.log('Vendor created/exists:', vendor.username);
  
  // Seed initial config if not exists
  const config = await prisma.config.findFirst();
  if (!config) {
    await prisma.config.create({
      data: {
        globalCommission: 1000,
        baseDeliveryCharge: 250,
        freeDeliveryEnabled: false,
        freeDeliveryThreshold: 5000,
      },
    });
    console.log('Initial Config created');
  } else {
    console.log('Config already exists');
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
