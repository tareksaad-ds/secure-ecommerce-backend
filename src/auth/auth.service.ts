import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  //Register User
  async registerUser(data: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await argon2.hash(data.password);
    const user = await this.prisma.user.create({ data: { ...data, password: hashedPassword } });
    const token = await this.jwt.signAsync({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (user as any).password;
    return { access_token: token, user };
  }

  //Login User
  async login(data: LoginDto): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      throw new BadRequestException('User not found! Check your email');
    }

    const isPasswordValid = await argon2.verify(user.password, data.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password! Check your password');
    }

    const token = await this.jwt.signAsync({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return { access_token: token };
  }
}
