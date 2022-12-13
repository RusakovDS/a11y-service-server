import {Body, Controller, HttpCode, Post, ValidationPipe} from '@nestjs/common';
import {AuthService} from './auth.service';
import {CreateUserDto} from '../dto/create-user.dto';
import {SignInDto} from '../dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('/register')
  async register(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<object> {
    return this.authService.register(createUserDto);
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<object> {
    return this.authService.login(signInDto);
  }

  @Post('/refresh-token')
  async refresh(@Body() refreshToken): Promise<object> {
    return this.authService.refreshToken(refreshToken.refreshToken);
  }
}
