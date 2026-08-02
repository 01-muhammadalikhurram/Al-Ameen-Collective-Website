const express = require('express');
const { 
  createOrder, getAdminOrders, getAdminOrderById, updateOrderStatusAdmin,
  getVendorOrders, getVendorOrderById, updateOrderStatusVendor, trackOrder, getVendorPayouts, getVendorOrderByOrderId
} = require('../controllers/order.controller');
const { protect, authorizeRoles } = require('../middlewares/auth.middleware');

const router = express.Router();

// Public route to generate an order
router.post('/', createOrder);
// Public route to track order
router.get('/track/:orderId', trackOrder);

// Admin routes
router.get('/admin', protect, authorizeRoles('ADMIN'), getAdminOrders);
router.get('/admin/:id', protect, authorizeRoles('ADMIN'), getAdminOrderById);
router.patch('/admin/:id/status', protect, authorizeRoles('ADMIN'), updateOrderStatusAdmin);

// Vendor routes
router.get('/vendor/payouts', protect, authorizeRoles('VENDOR'), getVendorPayouts);
router.get('/vendor/search/:orderId', protect, authorizeRoles('VENDOR'), getVendorOrderByOrderId);
router.get('/vendor', protect, authorizeRoles('VENDOR'), getVendorOrders);
router.get('/vendor/:id', protect, authorizeRoles('VENDOR'), getVendorOrderById);
router.patch('/vendor/:id/status', protect, authorizeRoles('VENDOR'), updateOrderStatusVendor);

module.exports = router;
