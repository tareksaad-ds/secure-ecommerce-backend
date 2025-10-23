import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async getAllOrders() {
    const orders = await this.prisma.order.findMany({
      include: {
        products: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Get user data for each order
    const ordersWithUsers = await Promise.all(
      orders.map(async (order) => {
        const user = await this.prisma.user.findUnique({
          where: { id: order.userId },
          select: {
            id: true,
            email: true,
            name: true,
          },
        });

        return {
          ...order,
          user,
        };
      }),
    );

    return ordersWithUsers;
  }

  async getOrdersByUserId(userId: number) {
    return await this.prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        products: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createOrder(userId: number, createOrderDto: CreateOrderDto) {
    const { productIds, totalAmount } = createOrderDto;
    // Verify that all products exist
    const products = await this.prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    if (products.length !== productIds.length) {
      throw new Error('One or more products not found');
    }

    // Create the order first
    const order = await this.prisma.order.create({
      data: {
        userId,
        productIds,
        totalAmount,
      },
    });

    // Then connect the products
    const orderWithProducts = await this.prisma.order.update({
      where: { id: order.id },
      data: {
        userId,
        totalAmount,
        products: {
          connect: productIds.map((id) => ({ id })),
        },
      },
      include: {
        products: true,
      },
    });

    return orderWithProducts;
  }

  async deleteOrder(orderId: number) {
    // Check if order exists
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    // Delete the order
    await this.prisma.order.delete({
      where: { id: orderId },
    });

    return { message: 'Order deleted successfully' };
  }
}
