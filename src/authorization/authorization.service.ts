import { Injectable } from '@nestjs/common';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthorizationService {
  async signup(createUserDto: CreateUserDto) {
    console.log('createUserDto <-------', createUserDto);
    return await 'This action adds a new authorization';
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
