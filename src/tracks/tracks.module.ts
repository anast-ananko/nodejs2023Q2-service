import { Module } from '@nestjs/common';

import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { InMemoryTracksStore } from './store/tracks.storage';
import { FavsModule } from 'src/favs/favs.module';

@Module({
  imports: [FavsModule],
  controllers: [TracksController],
  providers: [
    TracksService,
    {
      provide: 'TracksStore',
      useClass: InMemoryTracksStore,
    },
  ],
  exports: [
    {
      provide: 'TracksStore',
      useClass: InMemoryTracksStore,
    },
  ],
})
export class TracksModule {}
