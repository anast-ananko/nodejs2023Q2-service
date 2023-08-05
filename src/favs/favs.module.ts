import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { FavsArtistEntity } from './entities/favs-artist.entity';
import { FavsAlbumEntity } from './entities/favs-album.entity';
import { FavsTrackEntity } from './entities/favs-track.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { ArtistsService } from 'src/artists/artists.service';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';

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
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistsModule),
  ],
  controllers: [FavsController],
  providers: [FavsService, ArtistsService, AlbumsService, TracksService],
})
export class FavsModule {}
