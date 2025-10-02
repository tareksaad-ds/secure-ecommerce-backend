import { Controller, Delete, Get, Post, Put, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import type { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  //Get User By Id
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.usersService.getUserById(id);
  }

  //Update User
  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() data: UpdateUserDto): Promise<User> {
    return this.usersService.updateUser(id, data);
  }

  //Delete User
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<User> {
    return this.usersService.deleteUser(id);
  }
}
