/*
  Warnings:

  - This migration will drop and recreate the Product table with the new schema
  - All existing product data will be lost
  - All orders referencing products will also be deleted

*/

-- First, delete all orders (they reference products)
DELETE FROM "Order";

-- Drop the foreign key constraint first
ALTER TABLE "Order" DROP CONSTRAINT "Order_productId_fkey";

-- Drop the Product table
DROP TABLE "Product";

-- Recreate the Product table with new schema
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "originalPrice" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT,
    "category" TEXT,
    "discount" DOUBLE PRECISION DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- Recreate the foreign key constraint in Order table
ALTER TABLE "Order" ADD CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
