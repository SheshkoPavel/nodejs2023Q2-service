import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  // @Put(':id')
  // @HttpCode(200)
  // update(
  //   @Param('id', new ParseUUIDPipe()) id: string,
  //   @Body() updateUserDto: UpdateUserDto,
  // ): User {
  //   return this.usersService.update(id, updateUserDto);
  // }

  // @Delete(':id')
  // @HttpCode(204)
  // remove(@Param('id', new ParseUUIDPipe()) id: string) {
  //   return this.usersService.remove(id);
  // }
}
