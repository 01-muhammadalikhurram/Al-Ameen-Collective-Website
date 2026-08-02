const express = require('express');
const { 
  createOrder, getAdminOrders, getAdminOrderById, updateOrderStatusAdmin,
  getVendorOrders, getVendorOrderById, updateOrderStatusVendor, trackOrder, getVendorPayouts
} = require('../controllers/order.controller');
const { verifyToken, authorizeRoles } = require('../middlewares/auth.middleware');

const router = express.Router();

// Public route to generate an order
router.post('/', createOrder);
// Public route to track order
router.get('/track/:orderId', trackOrder);

// Admin routes
router.get('/admin', verifyToken, authorizeRoles('ADMIN'), getAdminOrders);
router.get('/admin/:id', verifyToken, authorizeRoles('ADMIN'), getAdminOrderById);
router.patch('/admin/:id/status', verifyToken, authorizeRoles('ADMIN'), updateOrderStatusAdmin);

// Vendor routes
router.get('/vendor/payouts', verifyToken, authorizeRoles('VENDOR'), getVendorPayouts);
router.get('/vendor', verifyToken, authorizeRoles('VENDOR'), getVendorOrders);
router.get('/vendor/:id', verifyToken, authorizeRoles('VENDOR'), getVendorOrderById);
router.patch('/vendor/:id/status', verifyToken, authorizeRoles('VENDOR'), updateOrderStatusVendor);

module.exports = router;
