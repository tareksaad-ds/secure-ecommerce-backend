import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Role, type Order } from '@prisma/client';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { JwtPayload } from 'src/auth/jwt.strategy';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/role.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  //Create Order
  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrder(
    @Body() data: CreateOrderDto,
    @Req() req: Request & { user: JwtPayload },
  ): Promise<Order> {
    return this.ordersService.createOrder(data, req.user.sub);
  }

  //Get All Orders
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async getAllOrders(): Promise<Order[]> {
    return this.ordersService.getAllOrders();
  }

  //Get Order By Id
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOrderById(@Param('id') id: number): Promise<Order> {
    return this.ordersService.getOrderById(id);
  }

  //Update Order
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateOrder(@Param('id') id: number, @Body() data: UpdateOrderDto): Promise<Order> {
    return this.ordersService.updateOrder(id, data);
  }

  //Delete Order
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteOrder(@Param('id') id: number): Promise<Order> {
    return this.ordersService.deleteOrder(id);
  }
}
