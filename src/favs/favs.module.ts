import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { FavsArtistEntity } from './entities/favs-artist.entity';
import { FavsAlbumEntity } from './entities/favs-album.entity';
import { FavsTrackEntity } from './entities/favs-track.entity';
import { ArtistEntity } from '../artists/entities/artist.entity';
import { AlbumEntity } from '../albums/entities/album.entity';
import { TrackEntity } from '../tracks/entities/track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavsArtistEntity,
      FavsAlbumEntity,
      FavsTrackEntity,
      ArtistEntity,
      AlbumEntity,
      TrackEntity,
    ]),
  ],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
