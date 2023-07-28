import { Injectable, Scope } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { AlbumsStore } from '../interfaces/album-storage.interface';
import { Album } from '../interfaces/album.interface';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';

@Injectable({ scope: Scope.DEFAULT })
export class InMemoryAlbumsStore implements AlbumsStore {
  private albums: Album[] = [];

  findAll() {
    return this.albums;
  }

  findById(id: string) {
    return this.albums.find((album) => album.id === id);
  }

  create(dto: CreateAlbumDto) {
    const newAlbum = {
      id: uuidv4(),
      ...dto,
    };
    this.albums.push(newAlbum);

    return newAlbum;
  }

  update(id: string, dto: UpdateAlbumDto) {
    const updatedAlbum = this.albums.find((album) => album.id === id);

    updatedAlbum.name = dto.name;
    updatedAlbum.year = dto.year;
    updatedAlbum.artistId = dto.artistId;

    return updatedAlbum;
  }

  delete(id: string) {
    const albumIndex = this.albums.findIndex((album) => album.id === id);

    if (albumIndex !== -1) {
      const deletedAlbum = this.albums.splice(albumIndex, 1)[0];

      return deletedAlbum;
    }

    return null;
  }
}
