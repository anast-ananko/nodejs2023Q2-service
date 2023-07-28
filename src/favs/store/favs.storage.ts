import { Injectable, Scope } from '@nestjs/common';

import { FavsStore } from '../interfaces/favs-storage.interface';
import { Favs } from '../interfaces/favs.interface';
import { Artist } from 'src/artists/interfaces/artist.interface';
import { Album } from 'src/albums/interfaces/album.interface';
import { Track } from 'src/tracks/interfaces/track.interface';

@Injectable({ scope: Scope.DEFAULT })
export class InMemoryFavsStore implements FavsStore {
  private favs: Favs | null = {
    artists: [],
    albums: [],
    tracks: [],
  };

  findAll() {
    return this.favs;
  }

  addTrack(track: Track) {
    this.favs.tracks.push(track);
  }

  deleteTrack(id: string) {
    const trackIndex = this.favs.tracks.findIndex((track) => track.id === id);

    if (trackIndex !== -1) {
      const deletedTrack = this.favs.tracks.splice(trackIndex, 1)[0];

      return deletedTrack;
    }

    return null;
  }

  addAlbum(album: Album) {
    this.favs.albums.push(album);
  }

  deleteAlbum(id: string) {
    const albumIndex = this.favs.albums.findIndex((album) => album.id === id);

    if (albumIndex !== -1) {
      const deletedAlbum = this.favs.albums.splice(albumIndex, 1)[0];

      return deletedAlbum;
    }

    return null;
  }

  addArtist(artist: Artist) {
    this.favs.artists.push(artist);
  }

  deleteArtist(id: string) {
    const artistIndex = this.favs.artists.findIndex(
      (artist) => artist.id === id,
    );

    if (artistIndex !== -1) {
      const deletedArtist = this.favs.artists.splice(artistIndex, 1)[0];

      return deletedArtist;
    }

    return null;
  }
}
