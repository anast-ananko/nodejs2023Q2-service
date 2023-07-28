import { Inject, Injectable } from '@nestjs/common';

import { InMemoryAlbumsStore } from './store/albums.storage';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(@Inject('AlbumsStore') private storage: InMemoryAlbumsStore) {}

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    return this.storage.findById(id);
  }

  create(createAlbumDto: CreateAlbumDto) {
    return this.storage.create(createAlbumDto);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.storage.update(id, updateAlbumDto);
  }

  delete(id: string) {
    return this.storage.delete(id);
  }
}
