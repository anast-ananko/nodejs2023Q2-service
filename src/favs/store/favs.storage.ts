import { Injectable, Scope } from '@nestjs/common';

import { FavsStore } from '../interfaces/favs-storage.interface';
import { Favs } from '../interfaces/favs.interface';

@Injectable({ scope: Scope.DEFAULT })
export class InMemoryFavsStore implements FavsStore {
  private favs: Favs = {
    artists: [],
    albums: [],
    tracks: [],
  };

  findAll() {
    return this.favs;
  }

  addTrack(id: string) {
    this.favs.tracks.push(id);
  }

  deleteTrack(id: string) {
    const trackIdIndex = this.favs.tracks.findIndex(
      (trackId) => trackId === id,
    );

    if (trackIdIndex !== -1) {
      const deletedTrackId = this.favs.tracks.splice(trackIdIndex, 1)[0];

      return deletedTrackId;
    }

    return null;
  }

  addAlbum(id: string) {
    this.favs.albums.push(id);
  }

  deleteAlbum(id: string) {
    const albumIdIndex = this.favs.albums.findIndex(
      (albumId) => albumId === id,
    );

    if (albumIdIndex !== -1) {
      const deletedAlbumId = this.favs.albums.splice(albumIdIndex, 1)[0];

      return deletedAlbumId;
    }

    return null;
  }

  addArtist(id: string) {
    this.favs.artists.push(id);
  }

  deleteArtist(id: string) {
    const artistIdIndex = this.favs.artists.findIndex(
      (artistId) => artistId === id,
    );

    if (artistIdIndex !== -1) {
      const deletedArtistId = this.favs.artists.splice(artistIdIndex, 1)[0];

      return deletedArtistId;
    }

    return null;
  }
}
