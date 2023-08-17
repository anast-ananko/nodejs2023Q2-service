import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (user) {
      return instanceToPlain(user);
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async findOneByLogin(login: string) {
    const user = await this.userRepository.findOne({
      where: { login },
    });

    return user;
  }

  async findOneWithPassword(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (user) {
      return user;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.save({
      ...createUserDto,
    });

    return instanceToPlain(await this.findOne(user.id));
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOneWithPassword(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.oldPassword === user.password) {
      await this.userRepository.update(id, {
        password: updateUserDto.newPassword,
      });

      return await this.findOne(user.id);
    } else {
      throw new ForbiddenException('Wrong old password');
    }
  }

  async delete(id: string) {
    const user = await this.findOne(id);

    if (user) {
      return await this.userRepository.delete({ id: user.id });
    }
  }
}
