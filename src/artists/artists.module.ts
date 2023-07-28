import { Module } from '@nestjs/common';

import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { InMemoryArtistsStore } from './store/artists.storage';

@Module({
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    {
      provide: 'ArtistsStore',
      useClass: InMemoryArtistsStore,
    },
  ],
})
export class ArtistsModule {}
