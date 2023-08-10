import { Controller, Post, Body, HttpCode, Request } from '@nestjs/common';

import { AuthorizationService } from './authorization.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authorizationService.signup(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Request() req) {
    return await this.authorizationService.login(req.user);
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(@Request() req) {
    return await this.authorizationService.refresh(req);
  }
}
