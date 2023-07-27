import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InMemoryDb } from 'src/db/inMemoryDB';

@Injectable()
export class UsersService {
  constructor(private db: InMemoryDb) {}

  create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;

    if (!login || !password) throw new HttpException(`Login or Password wasn't provided`, HttpStatus.BAD_REQUEST);

    const newUser = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.db.users.push(newUser);

    return newUser;
  }

  findAll() {
    return this.db.users;
  }

  findOne(id: string) {
    if (!uuidValidate(id)) throw new HttpException(`Validation failed (uuid  is expected)`, HttpStatus.BAD_REQUEST);

    const user = this.db.users.find((user) => user.id === id);

    if (!user) throw new HttpException(`User with id: ${id} not found`, HttpStatus.NOT_FOUND);

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (!uuidValidate(id)) throw new HttpException(`Validation failed (uuid  is expected)`, HttpStatus.BAD_REQUEST);

    const { oldPassword, newPassword } = updateUserDto;

    const user = this.findOne(id);
    if (!user) throw new HttpException(`User with id: ${id} not found`, HttpStatus.NOT_FOUND);

    if (oldPassword !== user.password) {
      throw new HttpException('Password is incorrect', HttpStatus.FORBIDDEN)
    }

    user.password = newPassword;
    user.version = user.version + 1;
    user.updatedAt = Date.now();

    return user;
  }

  remove(id: string) {
    if (!uuidValidate(id)) throw new HttpException(`Validation failed (uuid  is expected)`, HttpStatus.BAD_REQUEST);

    const userIndex = this.db.users.findIndex((user) => user.id === id);
    if (userIndex === -1) throw new HttpException(`User with id: ${id} not found`, HttpStatus.NOT_FOUND);

    this.db.users.splice(userIndex, 1);
  }
}
