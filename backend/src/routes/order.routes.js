const express = require('express');
const { createOrder } = require('../controllers/order.controller');

const router = express.Router();

// Public route to generate an order
router.post('/', createOrder);

module.exports = router;
