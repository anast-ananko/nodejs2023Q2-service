import { Inject, Injectable } from '@nestjs/common';

import { InMemoryUsersStore } from './store/users.storage';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('UsersStore') private storage: InMemoryUsersStore) {}

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    return this.storage.findById(id);
  }

  findOneWithPassword(id: string) {
    return this.storage.findByIdWithPassword(id);
  }

  create(createUserDto: CreateUserDto) {
    return this.storage.create(createUserDto);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.storage.update(id, updateUserDto);
  }

  delete(id: string) {
    return this.storage.delete(id);
  }
}
