import { Module, forwardRef } from '@nestjs/common';

import { FavsService } from './favs.service';
import { InMemoryFavsStore } from './store/favs.storage';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavsController } from './favs.controller';

@Module({
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistsModule),
  ],
  controllers: [FavsController],
  providers: [
    FavsService,
    {
      provide: 'FavsStore',
      useClass: InMemoryFavsStore,
    },
  ],
  exports: [
    {
      provide: 'FavsStore',
      useClass: InMemoryFavsStore,
    },
  ],
})
export class FavsModule {}
