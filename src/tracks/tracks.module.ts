import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { TrackEntity } from './entities/track.entity';
import { FavsModule } from 'src/favs/favs.module';
import { FavsTrackEntity } from 'src/favs/entities/favs-track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity, FavsTrackEntity])],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
