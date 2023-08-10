import { Injectable } from '@nestjs/common';
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
    console.log('user <-------', user);
    return await `This action returns all authorization`;
  }

  async refresh(user: User) {
    console.log('user <-------', user);
    return await `This action returns all authorization`;
  }
}
