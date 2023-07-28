import { Module } from '@nestjs/common';

import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { InMemoryAlbumsStore } from './store/albums.storage';
import { TracksModule } from 'src/tracks/tracks.module';

@Module({
  imports: [TracksModule],
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    {
      provide: 'AlbumsStore',
      useClass: InMemoryAlbumsStore,
    },
  ],
  exports: [
    {
      provide: 'AlbumsStore',
      useClass: InMemoryAlbumsStore,
    },
  ],
})
export class AlbumsModule {}
