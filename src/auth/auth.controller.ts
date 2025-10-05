import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //Register User
  @Post('register')
  async registerUser(@Body() data: CreateUserDto): Promise<{ access_token: string }> {
    return this.authService.registerUser(data);
  }

  //Login User
  @Post('login')
  async loginUser(@Body() data: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(data);
  }
}
