const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAdminDashboard = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.totalCustomerPayable, 0);
    
    // Commission Math
    const pendingCommission = orders
      .filter(o => !o.commissionReceived)
      .reduce((sum, o) => sum + o.totalAdminCommission, 0);
      
    const earnedCommission = orders
      .filter(o => o.commissionReceived)
      .reduce((sum, o) => sum + o.totalAdminCommission, 0);
      
    const statusCounts = orders.reduce((acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1;
      return acc;
    }, {});

    res.json({
      totalOrders,
      totalRevenue,
      pendingCommission,
      earnedCommission,
      statusCounts
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getVendorDashboard = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        status: { in: ['CONFIRMED', 'SHIPPED', 'DELIVERED', 'RETURNED'] }
      }
    });
    
    const activeOrdersCount = orders.filter(o => ['CONFIRMED', 'SHIPPED'].includes(o.status)).length;
    
    const totalOwedToAdmin = orders
      .filter(o => o.status === 'DELIVERED' && !o.commissionReceived)
      .reduce((sum, o) => sum + o.totalAdminCommission, 0);
      
    const totalWholesaleEarned = orders
      .filter(o => o.status === 'DELIVERED')
      .reduce((sum, o) => sum + o.totalWholesalePrice, 0);

    res.json({
      activeOrdersCount,
      totalOwedToAdmin,
      totalWholesaleEarned
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAdminDashboard,
  getVendorDashboard
};
