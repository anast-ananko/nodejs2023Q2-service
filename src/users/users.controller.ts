import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  BadRequestException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { validate } from 'uuid';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid userId');
    }

    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid userId');
    }

    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid userId');
    }

    return this.usersService.delete(id);
  }
}
