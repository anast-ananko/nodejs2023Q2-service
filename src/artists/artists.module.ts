import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { ArtistEntity } from './entities/artist.entity';
import { AlbumsModule } from 'src/albums/albums.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavsModule } from 'src/favs/favs.module';
import { FavsArtistEntity } from 'src/favs/entities/favs-artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity, FavsArtistEntity])],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
