import { Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';
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
  async getAllUsers(): Promise<
    { id: number; name: string | null; email: string; createdAt: Date; role: Role }[]
  > {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        role: true,
      },
    });
  }

  //Get User By Id
  async getUserById(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } }) as Promise<User>;
  }

  //Update User
  async updateUser(id: number, data: UpdateUserDto) {
    const updatedUser = await this.prisma.user.update({ where: { id }, data });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (updatedUser as any).password;
    return updatedUser;
  }

  //Delete User
  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
