import { Module } from '@nestjs/common';

import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { TracksModule } from 'src/tracks/tracks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavsModule } from 'src/favs/favs.module';
import { AlbumEntity } from './entities/album.entity';
import { FavsAlbumEntity } from 'src/favs/entities/favs-album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity, FavsAlbumEntity])],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
