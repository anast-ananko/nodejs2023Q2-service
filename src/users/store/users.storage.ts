import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { UsersStore } from '../interfaces/user-storage.interface';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class InMemoryUsersStore implements UsersStore {
  private users: User[] = [];

  findAll() {
    const usersWithoutPassword = this.users.map((user) => {
      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;

      return userWithoutPassword;
    });

    return usersWithoutPassword;
  }

  findById(id: string) {
    const user = this.users.find((user) => user.id === id);

    let userWithoutPassword: User;
    if (user) {
      userWithoutPassword = { ...user };
      delete userWithoutPassword.password;
    }

    return userWithoutPassword;
  }

  findByIdWithPassword(id: string) {
    return this.users.find((user) => user.id === id);
  }

  create(dto: CreateUserDto) {
    const newUser = {
      id: uuidv4(),
      ...dto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);

    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;

    return userWithoutPassword;
  }

  update(id: string, dto: UpdateUserDto) {
    const updatedUser = this.users.find((user) => user.id === id);

    updatedUser.password = dto.newPassword;
    updatedUser.version += 1;
    updatedUser.updatedAt = Date.now();

    const userWithoutPassword = { ...updatedUser };
    delete userWithoutPassword.password;

    return userWithoutPassword;
  }

  delete(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      const deletedUser = this.users.splice(userIndex, 1)[0];

      return deletedUser;
    }

    return null;
  }
}
