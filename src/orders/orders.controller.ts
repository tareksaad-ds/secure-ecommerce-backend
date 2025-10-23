import {
  Controller,
  Get,
  Post,
  Delete,
  UseGuards,
  Request,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/role.decorator';
import { Role } from '@prisma/client';
import { JwtPayload } from 'src/auth/jwt.strategy';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async getAllOrders() {
    return await this.ordersService.getAllOrders();
  }

  @Get('my-orders')
  async getMyOrders(@Request() req: Request & { user: JwtPayload }) {
    const userId = req.user.sub;
    return await this.ordersService.getOrdersByUserId(userId);
  }

  @Post()
  async createOrder(
    @Request() req: Request & { user: JwtPayload },
    @Body() createOrderDto: CreateOrderDto,
  ) {
    const userId = req.user.sub;
    return await this.ordersService.createOrder(userId, createOrderDto);
  }

  @Delete(':id')
  async deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return await this.ordersService.deleteOrder(id);
  }
}
