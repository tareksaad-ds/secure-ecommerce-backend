import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting to seed database...');

  const products = [
    {
      name: 'Stainless Steel Water Bottle',
      description: 'Keep your drinks cold for 24 hours or hot for 12 hours',
      price: 29.99,
      originalPrice: 39.99,
      imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=400&fit=crop',
      category: 'Lifestyle',
      discount: 25,
    },
    {
      name: 'Running Shoes Elite',
      description: 'Lightweight and breathable shoes for serious runners',
      price: 159.99,
      originalPrice: 199.99,
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=400&fit=crop',
      category: 'Sports',
      discount: 20,
    },
    {
      name: 'Coffee Maker Deluxe',
      description: 'Brew barista-quality coffee at home with one touch',
      price: 249.99,
      originalPrice: 249.99,
      imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=400&fit=crop',
      category: 'Home & Kitchen',
      discount: 0,
    },
    {
      name: 'Yoga Mat Premium',
      description: 'Non-slip, eco-friendly mat for all yoga practices',
      price: 49.99,
      originalPrice: 69.99,
      imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=400&fit=crop',
      category: 'Fitness',
      discount: 29,
    },
    {
      name: 'Portable Bluetooth Speaker',
      description: 'Waterproof speaker with 360° sound and 20-hour battery',
      price: 79.99,
      originalPrice: 99.99,
      imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=400&fit=crop',
      category: 'Electronics',
      discount: 20,
    },
    {
      name: 'Desk Lamp LED',
      description: 'Adjustable LED lamp with USB charging port',
      price: 44.99,
      originalPrice: 44.99,
      imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=400&fit=crop',
      category: 'Home & Office',
      discount: 0,
    },
    {
      name: 'Gaming Mouse RGB',
      description: 'High-precision gaming mouse with customizable RGB lighting',
      price: 69.99,
      originalPrice: 89.99,
      imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=400&fit=crop',
      category: 'Gaming',
      discount: 22,
    },
    {
      name: 'Wireless Keyboard',
      description: 'Wireless keyboard with ergonomic design and long battery life',
      price: 49.99,
      originalPrice: 49.99,
      imageUrl:
        'https://unsplash.com/photos/black-and-orange-computer-keyboard-KYw1eUx1J7Y?w=500&h=400&fit=crop',
      category: 'Home & Office',
      discount: 0,
    },
    {
      name: 'Smartwatch Fitness Tracker',
      description: 'Smartwatch with fitness tracking and heart rate monitoring',
      price: 199.99,
      originalPrice: 199.99,
      imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&h=400&fit=crop',
      category: 'Wearables',
      discount: 0,
    },
    {
      name: 'Digital Camera',
      description: 'Digital camera with 24MP sensor and 4K video recording',
      price: 299.99,
      originalPrice: 299.99,
      imageUrl:
        'https://unsplash.com/photos/black-and-silver-pentax-camera-SXjTAlW1kLc?w=500&h=400&fit=crop',
      category: 'Photography',
      discount: 0,
    },
    {
      name: 'Ergonomic Office Chair',
      description: 'Ergonomic office chair with adjustable height and lumbar support',
      price: 399.99,
      originalPrice: 399.99,
      imageUrl: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&h=400&fit=crop',
      category: 'Furniture',
      discount: 0,
    },
    {
      name: 'Wireless Headphones',
      description: 'Wireless headphones with noise-cancelling technology and long battery life',
      price: 199.99,
      originalPrice: 199.99,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop',
      category: 'Electronics',
      discount: 0,
    },
    {
      name: 'Smart TV 4K',
      description: 'Smart TV with 4K resolution and HDR support',
      price: 1999.99,
      originalPrice: 1999.99,
      imageUrl:
        'https://unsplash.com/photos/black-flat-screen-tv-turned-on-showing-game-qDLLP0yP7FU?w=500&h=400&fit=crop',
      category: 'Electronics',
      discount: 0,
    },
  ];

  // Check if products already exist
  const existingProducts = await prisma.product.count();

  if (existingProducts > 0) {
    console.log(`Database already contains ${existingProducts} products. Skipping seed...`);
    console.log('If you want to re-seed, delete all products first.');
    return;
  }

  // Insert products
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  const totalProducts = await prisma.product.count();
  console.log(`✅ Seeding completed! Total products: ${totalProducts}`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
