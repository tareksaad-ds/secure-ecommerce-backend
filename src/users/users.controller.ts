import { Controller, Delete, Get, Post, Put, Body, Param, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import type { Role, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { JwtPayload } from 'src/auth/jwt.strategy';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //Create User
  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<User> {
    return this.usersService.createUser(data);
  }

  //Get All Users
  @Get()
  async getAllUsers(): Promise<
    { id: number; name: string | null; email: string; createdAt: Date; role: Role }[]
  > {
    return this.usersService.getAllUsers();
  }

  //Get ME
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: Request & { user: JwtPayload }) {
    return req.user;
  }
  //Get User By Id
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.usersService.getUserById(id);
  }

  //Update User
  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() data: UpdateUserDto) {
    return this.usersService.updateUser(id, data);
  }

  //Delete User
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<User> {
    return this.usersService.deleteUser(id);
  }

  //Get Me
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: Request & { user: JwtPayload }) {
    return req.user;
  }
}
