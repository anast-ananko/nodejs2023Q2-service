import { Inject, Injectable } from '@nestjs/common';

import { InMemoryAlbumsStore } from './store/albums.storage';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InMemoryTracksStore } from 'src/tracks/store/tracks.storage';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject('AlbumsStore') private albumsStorage: InMemoryAlbumsStore,
    @Inject('TracksStore') private tracksStorage: InMemoryTracksStore,
  ) {}

  findAll() {
    return this.albumsStorage.findAll();
  }

  findOne(id: string) {
    return this.albumsStorage.findById(id);
  }

  create(createAlbumDto: CreateAlbumDto) {
    return this.albumsStorage.create(createAlbumDto);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.albumsStorage.update(id, updateAlbumDto);
  }

  delete(id: string) {
    const album = this.albumsStorage.delete(id);

    if (album) {
      const track = this.tracksStorage.findByAlbumId(album.id);
      if (track) {
        track.albumId = null;
      }
    }
  }
}
