import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async loginUser(@Body() { email, password }: LoginUserDto) {
    const token = await this.authService.login(email, password);

    return {
      message: 'Logged in successfully',
      token: token,
    };
  }
}
