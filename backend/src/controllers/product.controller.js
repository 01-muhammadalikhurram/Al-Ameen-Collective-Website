const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateProductCode } = require('../utils/codeGenerator');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

const createProduct = async (req, res) => {
  try {
    const {
      name, categories, gender, color, wholesalePrice, summary, description,
      brand, productType, fabricType, cuttingSize, shirtDetails, trouserDetails, commissionOverride
    } = req.body;

    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
    
    if (images.length === 0) {
      return res.status(400).json({ message: 'At least one image is required' });
    }

    const parsedCategories = typeof categories === 'string' ? JSON.parse(categories) : (categories || []);

    const productCode = await generateProductCode(parsedCategories, color, gender);

    const product = await prisma.product.create({
      data: {
        productCode,
        name,
        categories: parsedCategories,
        gender,
        color,
        wholesalePrice: Number(wholesalePrice),
        summary,
        description,
        images,
        brand,
        productType,
        fabricType,
        cuttingSize,
        shirtDetails,
        trouserDetails,
        commissionOverride: commissionOverride ? Number(commissionOverride) : null
      }
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Create Product Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAdminProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const toggleProductStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const updated = await prisma.product.update({
      where: { id },
      data: { isActive: !product.isActive }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createProduct,
  getAdminProducts,
  toggleProductStatus,
  upload
};
