import {
  Controller,
  Post,
  Body,
  HttpCode,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthorizationService } from './authorization.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Public } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Public()
  @Post('signup')
  @HttpCode(201)
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authorizationService.signup(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Request() req) {
    return await this.authorizationService.login(req.user);
  }

  @Public()
  @Post('refresh')
  @HttpCode(200)
  async refresh(@Request() req) {
    return await this.authorizationService.refresh(req.body);
  }
}
