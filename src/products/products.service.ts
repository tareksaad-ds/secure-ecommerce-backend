import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  //Create Product
  async createProduct(data: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  //Get All Products
  async getAllProducts(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  //Get Product By Id
  async getProductById(id: number): Promise<Product> {
    return this.prisma.product.findUnique({ where: { id } }) as Promise<Product>;
  }

  //Update Product
  async updateProduct(id: number, data: UpdateProductDto): Promise<Product> {
    return this.prisma.product.update({ where: { id }, data });
  }

  //Delete Product
  async deleteProduct(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }
}
