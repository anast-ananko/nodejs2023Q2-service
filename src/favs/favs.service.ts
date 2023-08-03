import { Inject, Injectable } from '@nestjs/common';

import { InMemoryFavsStore } from './store/favs.storage';
import { InMemoryAlbumsStore } from 'src/albums/store/albums.storage';
import { InMemoryTracksStore } from 'src/tracks/store/tracks.storage';
//import { InMemoryArtistsStore } from 'src/artists/store/artists.storage';
import { FavsData } from './interfaces/favs.interface';

@Injectable()
export class FavsService {
  constructor(
    @Inject('FavsStore')
    private favsStorage: InMemoryFavsStore,
    @Inject('TracksStore')
    private tracksStorage: InMemoryTracksStore,
    @Inject('AlbumsStore')
    private albumsStorage: InMemoryAlbumsStore, // @Inject('ArtistsStore') // private artistsStorage: InMemoryArtistsStore,
  ) {}

  findAll() {
    const favs = this.favsStorage.findAll();
    const favsData: FavsData = {
      artists: [],
      albums: [],
      tracks: [],
    };

    // favsData.artists = favs.artists.map((id) =>
    //   this.artistsStorage.findById(id),
    // );
    favsData.albums = favs.albums.map((id) => this.albumsStorage.findById(id));
    favsData.tracks = favs.tracks.map((id) => this.tracksStorage.findById(id));

    return favsData;
  }

  addTrack(id: string) {
    const track = this.tracksStorage.findById(id);

    if (track) {
      this.favsStorage.addTrack(id);
      return id;
    }

    return null;
  }

  deleteTrack(id: string) {
    const track = this.tracksStorage.findById(id);

    if (track) {
      this.favsStorage.deleteTrack(id);
      return id;
    }

    return null;
  }

  addAlbum(id: string) {
    const album = this.albumsStorage.findById(id);

    if (album) {
      this.favsStorage.addAlbum(id);
      return id;
    }

    return null;
  }

  deleteAlbum(id: string) {
    const album = this.albumsStorage.findById(id);

    if (album) {
      this.favsStorage.deleteAlbum(id);
      return id;
    }

    return null;
  }

  // addArtist(id: string) {
  //   // const artist = this.artistsStorage.findById(id);

  //   if (artist) {
  //     this.favsStorage.addArtist(id);
  //     return id;
  //   }

  //   return null;
  // }

  // deleteArtist(id: string) {
  //   const artist = this.artistsStorage.findById(id);

  //   if (artist) {
  //     this.favsStorage.deleteArtist(id);
  //     return id;
  //   }

  //   return null;
  // }
}
