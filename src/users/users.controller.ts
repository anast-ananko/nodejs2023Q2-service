import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  BadRequestException,
  NotFoundException,
  UsePipes,
  ValidationPipe,
  ForbiddenException,
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

    const user = this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid userId');
    }

    const user = this.usersService.findOneWithPassword(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.oldPassword !== user.password) {
      throw new ForbiddenException('Wrong old password');
    }

    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid userId');
    }

    const user = this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.usersService.delete(id);

    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'User deleted successfully',
    };
  }
}
