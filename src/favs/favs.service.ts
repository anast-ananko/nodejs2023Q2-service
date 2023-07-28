import { Inject, Injectable } from '@nestjs/common';

import { InMemoryFavsStore } from './store/favs.storage';
import { InMemoryAlbumsStore } from 'src/albums/store/albums.storage';
import { InMemoryTracksStore } from 'src/tracks/store/tracks.storage';
import { InMemoryArtistsStore } from 'src/artists/store/artists.storage';

@Injectable()
export class FavsService {
  constructor(
    @Inject('FavsStore') private favsStorage: InMemoryFavsStore,
    @Inject('TracksStore') private tracksStorage: InMemoryTracksStore,
    @Inject('AlbumsStore') private albumsStorage: InMemoryAlbumsStore,
    @Inject('ArtistsStore') private artistsStorage: InMemoryArtistsStore,
  ) {}

  findAll() {
    return this.favsStorage.findAll();
  }

  addTrack(id: string) {
    const track = this.tracksStorage.findById(id);

    if (track) {
      this.favsStorage.addTrack(track);
      return track;
    }

    return null;
  }

  deleteTrack(id: string) {
    const track = this.tracksStorage.findById(id);

    if (track) {
      this.favsStorage.deleteTrack(id);
      return track;
    }

    return null;
  }

  addAlbum(id: string) {
    const album = this.albumsStorage.findById(id);

    if (album) {
      this.favsStorage.addAlbum(album);
      return album;
    }

    return null;
  }

  deleteAlbum(id: string) {
    const album = this.albumsStorage.findById(id);

    if (album) {
      this.favsStorage.deleteAlbum(id);
      return album;
    }

    return null;
  }

  addArtist(id: string) {
    const artist = this.artistsStorage.findById(id);

    if (artist) {
      this.favsStorage.addArtist(artist);
      return artist;
    }

    return null;
  }

  deleteArtist(id: string) {
    const artist = this.artistsStorage.findById(id);

    if (artist) {
      this.favsStorage.deleteArtist(id);
      return artist;
    }

    return null;
  }
}
