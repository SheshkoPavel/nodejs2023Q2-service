import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  async validateUser(login: string, password: string) {
    const user = await this.usersService.findByLogin(login);
    if (!user) {
      return null;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return null;
    }

    return user;
  }

  async login(user: User) {
    const { login, id: userId } = user;
    const payload = { userId, login };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return { accessToken, refreshToken };
  }

  async refresh({ refreshToken }) {
    if (!refreshToken) {
      throw new UnauthorizedException("refresh token wasn't provided");
    }

    try {
      const { userId, login } = this.jwtService.verify(refreshToken);
      const user = new User({ id: userId, login });

      return await this.login(user);
    } catch {
      throw new ForbiddenException('refreshToken is invalid or expired');
    }
  }
}
