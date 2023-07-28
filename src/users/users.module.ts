import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { InMemoryUsersStore } from './store/users.storage';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UsersStore',
      useClass: InMemoryUsersStore,
    },
  ],
})
export class UsersModule {}
