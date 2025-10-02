import { Controller, Post, Get, Delete, Put, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import type { Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //Create Product
  @Post()
  async createProduct(@Body() data: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(data);
  }

  //Get All Products
  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  //Get Product By Id
  @Get(':id')
  async getProductById(@Param('id') id: number): Promise<Product> {
    return this.productsService.getProductById(id);
  }

  //Update Product
  @Put(':id')
  async updateProduct(@Param('id') id: number, @Body() data: UpdateProductDto): Promise<Product> {
    return this.productsService.updateProduct(id, data);
  }

  //Delete Product
  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<Product> {
    return this.productsService.deleteProduct(id);
  }
}
