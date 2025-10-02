import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  //Create Order
  async createOrder(data: CreateOrderDto): Promise<Order> {
    return this.prisma.order.create({ data });
  }

  //Get All Orders
  async getAllOrders(): Promise<Order[]> {
    return this.prisma.order.findMany({ include: { product: true, user: true } });
  }

  //Get Order By Id
  async getOrderById(id: number): Promise<Order> {
    return this.prisma.order.findUnique({ where: { id } }) as Promise<Order>;
  }

  //Update Order
  async updateOrder(id: number, data: UpdateOrderDto): Promise<Order> {
    return this.prisma.order.update({ where: { id }, data });
  }

  //Delete Order
  async deleteOrder(id: number): Promise<Order> {
    return this.prisma.order.delete({ where: { id } });
  }
}
