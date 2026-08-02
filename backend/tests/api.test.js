const request = require('supertest');
const express = require('express');

// Mock Prisma client to bypass MongoDB replica set issues during basic testing
jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    config: {
      findFirst: jest.fn().mockResolvedValue({ globalCommission: 1000, baseDeliveryCharge: 250, freeDeliveryEnabled: false, freeDeliveryThreshold: 5000 })
    },
    product: {
      findMany: jest.fn().mockResolvedValue([{ id: '1', name: 'Test Product', categories: ['Lawn'], wholesalePrice: 2000, isActive: true }])
    },
    $disconnect: jest.fn()
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

// Mock Auth Middleware
jest.mock('../src/middlewares/auth.middleware', () => ({
  protect: (req, res, next) => next(),
  authorizeRoles: (...roles) => (req, res, next) => next()
}));

const app = express();
app.use(express.json());

// Import routes directly
const productRoutes = require('../src/routes/product.routes');
const configRoutes = require('../src/routes/config.routes');

app.use('/api/products', productRoutes);
app.use('/api/config', configRoutes);

describe('API Endpoints', () => {
  it('should fetch public products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should fetch configuration', async () => {
    const res = await request(app).get('/api/config');
    expect(res.statusCode).toEqual(200);
    expect(res.body.globalCommission).toEqual(1000);
  });
});
