import { Module } from '@nestjs/common';

import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { InMemoryArtistsStore } from './store/artists.storage';
import { AlbumsModule } from 'src/albums/albums.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavsModule } from 'src/favs/favs.module';

@Module({
  imports: [TracksModule, AlbumsModule, FavsModule],
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    {
      provide: 'ArtistsStore',
      useClass: InMemoryArtistsStore,
    },
  ],
  exports: [
    {
      provide: 'ArtistsStore',
      useClass: InMemoryArtistsStore,
    },
  ],
})
export class ArtistsModule {}
