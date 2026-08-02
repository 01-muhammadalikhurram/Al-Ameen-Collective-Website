const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Auto-generates a unique product code based on category, color, and gender.
 * Format: [CAT]-[COL]-[NUM]
 * Even NUM = Female, Odd NUM = Male, Unisex can be either.
 */
const generateProductCode = async (categories, color, gender) => {
  const cat = categories && categories.length > 0 
    ? categories[0].substring(0, 3).toUpperCase() 
    : 'GEN';
  
  const col = color ? color.substring(0, 2).toUpperCase() : 'XX';
  
  let isUnique = false;
  let code = '';
  let maxAttempts = 100;
  
  while (!isUnique && maxAttempts > 0) {
    let num = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
    
    if (gender === 'FEMALE' && num % 2 !== 0) num += 1;
    if (gender === 'MALE' && num % 2 === 0) num -= 1;
    
    code = `${cat}-${col}-${num}`;
    
    const existing = await prisma.product.findUnique({
      where: { productCode: code }
    });
    
    if (!existing) {
      isUnique = true;
    }
    maxAttempts--;
  }
  
  if (!isUnique) {
    throw new Error('Failed to generate a unique product code.');
  }
  
  return code;
};

module.exports = {
  generateProductCode
};
