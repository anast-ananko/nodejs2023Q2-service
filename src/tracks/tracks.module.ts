import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { TrackEntity } from './entities/track.entity';
import { FavsModule } from 'src/favs/favs.module';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity]), FavsModule],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
