import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import type { Order } from '@prisma/client';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  //Create Order
  @Post()
  async createOrder(@Body() data: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(data);
  }

  //Get All Orders
  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.ordersService.getAllOrders();
  }

  //Get Order By Id
  @Get(':id')
  async getOrderById(@Param('id') id: number): Promise<Order> {
    return this.ordersService.getOrderById(id);
  }

  //Update Order
  @Put(':id')
  async updateOrder(@Param('id') id: number, @Body() data: UpdateOrderDto): Promise<Order> {
    return this.ordersService.updateOrder(id, data);
  }

  //Delete Order
  @Delete(':id')
  async deleteOrder(@Param('id') id: number): Promise<Order> {
    return this.ordersService.deleteOrder(id);
  }
}
