import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = new User({ ...createUserDto });

    const user = this.userRepository.create(newUser);
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  // findOne(id: string) {
  //   const user = this.db.users.find((user) => user.id === id);

  //   if (!user) {
  //     throw new HttpException(
  //       `User with id: ${id} not found`,
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }

  //   return user;
  // }

  // update(id: string, updateUserDto: UpdateUserDto) {
  //   const { oldPassword, newPassword } = updateUserDto;

  //   const user = this.findOne(id);
  //   if (!user) {
  //     throw new HttpException(
  //       `User with id: ${id} not found`,
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }

  //   if (oldPassword !== user.password) {
  //     throw new HttpException('Password is incorrect', HttpStatus.FORBIDDEN);
  //   }

  //   user.password = newPassword;
  //   user.version = user.version + 1;
  //   user.updatedAt = Date.now();

  //   const responseUser = { ...user };
  //   delete responseUser.password;

  //   return responseUser;
  // }

  // remove(id: string) {
  //   const userIndex = this.db.users.findIndex((user) => user.id === id);
  //   if (userIndex === -1) {
  //     throw new HttpException(
  //       `User with id: ${id} not found`,
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }

  //   this.db.users.splice(userIndex, 1);
  // }
}
