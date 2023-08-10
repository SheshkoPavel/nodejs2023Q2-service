import { Injectable } from '@nestjs/common';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthorizationService {
  constructor(private readonly usersService: UsersService) {}

  async signup(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
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
