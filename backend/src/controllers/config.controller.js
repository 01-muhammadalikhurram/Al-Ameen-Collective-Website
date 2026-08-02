const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getConfig = async (req, res) => {
  try {
    let config = await prisma.config.findFirst();
    
    // Seed singleton if it doesn't exist
    if (!config) {
      config = await prisma.config.create({
        data: {
          globalCommission: 1000,
          baseDeliveryCharge: 250,
          freeDeliveryEnabled: false,
          freeDeliveryThreshold: 5000
        }
      });
    }

    res.json(config);
  } catch (error) {
    console.error('Config Fetch Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateConfig = async (req, res) => {
  try {
    const { globalCommission, baseDeliveryCharge, freeDeliveryEnabled, freeDeliveryThreshold } = req.body;

    let config = await prisma.config.findFirst();

    if (!config) {
       config = await prisma.config.create({
        data: {
          globalCommission: 1000,
          baseDeliveryCharge: 250,
          freeDeliveryEnabled: false,
          freeDeliveryThreshold: 5000
        }
      });
    }

    const updatedConfig = await prisma.config.update({
      where: { id: config.id },
      data: {
        globalCommission: Number(globalCommission),
        baseDeliveryCharge: Number(baseDeliveryCharge),
        freeDeliveryEnabled: Boolean(freeDeliveryEnabled),
        freeDeliveryThreshold: Number(freeDeliveryThreshold),
      }
    });

    res.json(updatedConfig);
  } catch (error) {
    console.error('Config Update Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getConfig,
  updateConfig
};
