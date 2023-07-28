import { Module } from '@nestjs/common';

import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { InMemoryAlbumsStore } from './store/albums.storage';

@Module({
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    {
      provide: 'AlbumsStore',
      useClass: InMemoryAlbumsStore,
    },
  ],
})
export class AlbumsModule {}
