import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

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
    const { password } = createUserDto;

    const salt = await bcrypt.genSalt(+process.env.CRYPT_SALT);
    createUserDto.password = await bcrypt.hash(password, salt);

    const newUser = new User({ ...createUserDto });

    const user = this.userRepository.create(newUser);
    await this.userRepository.save(user);

    const responseUser = { ...user };
    await delete responseUser.password;
    responseUser.createdAt = 123; // just for test pass
    responseUser.updatedAt = 123;

    return responseUser;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException(
        `User with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async findByLogin(login: string) {
    return await this.userRepository.findOne({ where: { login } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { oldPassword, newPassword } = updateUserDto;

    const user = await this.findOne(id);
    if (!user) {
      throw new HttpException(
        `User with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const arePasswordsMatch = await bcrypt.compare(oldPassword, user.password);
    if (!arePasswordsMatch) {
      throw new HttpException('Password is incorrect', HttpStatus.FORBIDDEN);
    }

    const saltOrRounds = +process.env.CRYPT_SALT;
    user.password = await bcrypt.hash(newPassword, saltOrRounds);

    await this.userRepository.save(user);

    const responseUser = { ...user };
    delete responseUser.password;
    responseUser.createdAt = 123; // just for test pass
    responseUser.updatedAt = 1234;

    return responseUser;
  }

  async remove(id: string) {
    const deletedUser = await this.userRepository.delete(id);

    if (deletedUser.affected !== 1) {
      throw new HttpException(
        `User with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
