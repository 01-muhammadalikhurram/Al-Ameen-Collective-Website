const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAdminDashboard = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true }
    });
    
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

    const recentOrders = [...orders].sort((a, b) => b.createdAt - a.createdAt).slice(0, 10);

    const productStats = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        if (!productStats[item.productCode]) {
          productStats[item.productCode] = { name: item.productName, code: item.productCode, sold: 0, returned: 0 };
        }
        if (order.status === 'RETURNED' || order.status === 'FILED_FOR_RETURN') {
          productStats[item.productCode].returned += item.quantity;
        } else if (order.status !== 'CANCELLED') {
          productStats[item.productCode].sold += item.quantity;
        }
      });
    });

    const performance = Object.values(productStats);
    const mostSold = [...performance].sort((a, b) => b.sold - a.sold).slice(0, 5);
    const mostReturned = [...performance].sort((a, b) => b.returned - a.returned).slice(0, 5);

    res.json({
      totalOrders,
      totalRevenue,
      pendingCommission,
      earnedCommission,
      statusCounts,
      recentOrders,
      mostSold,
      mostReturned
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
