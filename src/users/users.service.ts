import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //Create User
  async createUser(data: { email: string; password: string; name?: string }): Promise<User> {
    const hashedPassword = await argon2.hash(data.password);
    return this.prisma.user.create({ data: { ...data, password: hashedPassword } });
  }

  //Get All Users
  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  //Get User By Id
  async getUserById(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } }) as Promise<User>;
  }

  //Update User
  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  //Delete User
  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
