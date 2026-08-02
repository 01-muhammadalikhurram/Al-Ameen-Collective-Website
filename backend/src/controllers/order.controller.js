const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const generateOrderId = () => {
  return 'ORD-' + Math.floor(10000 + Math.random() * 90000);
};

const createOrder = async (req, res) => {
  try {
    const { items, customerDetails } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    if (!customerDetails || !customerDetails.name || !customerDetails.phone || !customerDetails.address) {
      return res.status(400).json({ message: 'Missing required customer details' });
    }

    // 1. Fetch Config
    let config = await prisma.config.findFirst();
    if (!config) {
      config = await prisma.config.create({ data: {} });
    }

    let totalWholesalePrice = 0;
    let totalAdminCommission = 0;
    const orderItemsData = [];

    // 2. Fetch current prices for each item to prevent client tampering
    for (const cartItem of items) {
      const product = await prisma.product.findUnique({
        where: { id: cartItem.productId }
      });

      if (!product || !product.isActive) {
        return res.status(400).json({ message: `A product in your cart is currently unavailable.` });
      }

      const commission = product.commissionOverride !== null ? product.commissionOverride : config.globalCommission;
      
      const itemWholesale = product.wholesalePrice * cartItem.quantity;
      const itemCommission = commission * cartItem.quantity;

      totalWholesalePrice += itemWholesale;
      totalAdminCommission += itemCommission;

      orderItemsData.push({
        productId: product.id,
        productName: product.name,
        productCode: product.productCode,
        productImage: product.images[0] || '',
        quantity: cartItem.quantity,
        wholesalePriceAtTime: product.wholesalePrice,
        commissionAtTime: commission,
        sellingPriceAtTime: (product.wholesalePrice + commission) * cartItem.quantity
      });
    }

    // 3. Calculate Delivery
    const orderSubtotal = totalWholesalePrice + totalAdminCommission;
    let deliveryCharges = config.baseDeliveryCharge;
    if (config.freeDeliveryEnabled && orderSubtotal >= config.freeDeliveryThreshold) {
      deliveryCharges = 0;
    }

    const totalCustomerPayable = orderSubtotal + deliveryCharges;
    let uniqueOrderId = generateOrderId();
    
    // Ensure uniqueness
    let existingOrder = await prisma.order.findUnique({ where: { orderId: uniqueOrderId } });
    while (existingOrder) {
        uniqueOrderId = generateOrderId();
        existingOrder = await prisma.order.findUnique({ where: { orderId: uniqueOrderId } });
    }

    // 4. Create Order & Items atomically
    const order = await prisma.order.create({
      data: {
        orderId: uniqueOrderId,
        customerName: customerDetails.name,
        customerPhone: customerDetails.phone,
        customerWhatsapp: customerDetails.whatsapp || customerDetails.phone,
        customerAddress: customerDetails.address,
        customerRemarks: customerDetails.remarks,
        deliveryCharges,
        totalWholesalePrice,
        totalAdminCommission,
        totalCustomerPayable,
        items: {
          create: orderItemsData
        }
      },
      include: {
        items: true
      }
    });

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAdminOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAdminOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true }
    });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateOrderStatusAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, commissionReceived } = req.body;
    
    const updateData = {};
    if (status) updateData.status = status;
    if (commissionReceived !== undefined) updateData.commissionReceived = commissionReceived;

    const order = await prisma.order.update({
      where: { id },
      data: updateData
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getVendorOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        status: { in: ['CONFIRMED', 'SHIPPED', 'DELIVERED', 'RETURNED'] }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getVendorOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true }
    });
    
    if (!order || order.status === 'PENDING' || order.status === 'CANCELLED') {
      return res.status(404).json({ message: 'Order not accessible by vendor' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateOrderStatusVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Vendor can only advance to specific states
    if (!['SHIPPED', 'DELIVERED', 'RETURNED'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status update for Vendor' });
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status }
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const trackOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await prisma.order.findUnique({
      where: { orderId },
      include: { items: true }
    });

    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Sanitize output for public
    const sanitizedOrder = {
      orderId: order.orderId,
      customerName: order.customerName,
      status: order.status,
      deliveryCharges: order.deliveryCharges,
      totalCustomerPayable: order.totalCustomerPayable,
      createdAt: order.createdAt,
      items: order.items.map(i => ({
        productName: i.productName,
        productCode: i.productCode,
        productImage: i.productImage,
        quantity: i.quantity,
        price: i.sellingPriceAtTime / i.quantity
      }))
    };

    res.json(sanitizedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getVendorPayouts = async (req, res) => {
  try {
    const payouts = await prisma.order.findMany({
      where: { commissionReceived: true },
      orderBy: { updatedAt: 'desc' }
    });
    res.json(payouts);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getVendorOrderByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await prisma.order.findUnique({ where: { orderId: orderId.toUpperCase() } });
    if (!order || !['CONFIRMED', 'SHIPPED', 'DELIVERED', 'RETURNED'].includes(order.status)) {
      return res.status(404).json({ message: 'Order not found or access denied' });
    }
    res.json({ id: order.id });
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
};

module.exports = {
  createOrder,
  getAdminOrders,
  getAdminOrderById,
  updateOrderStatusAdmin,
  getVendorOrders,
  getVendorOrderById,
  updateOrderStatusVendor,
  trackOrder,
  getVendorPayouts,
  getVendorOrderByOrderId
};
