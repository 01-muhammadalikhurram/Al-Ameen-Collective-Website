const express = require('express');
const { createProduct, getAdminProducts, toggleProductStatus, upload } = require('../controllers/product.controller');
const { protect, authorizeRoles } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', protect, authorizeRoles('ADMIN'), upload.array('images', 5), createProduct);
router.get('/admin', protect, authorizeRoles('ADMIN'), getAdminProducts);
router.patch('/:id/toggle', protect, authorizeRoles('ADMIN'), toggleProductStatus);

module.exports = router;
