import { Inject, Injectable } from '@nestjs/common';

import { InMemoryArtistsStore } from './store/artists.storage';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InMemoryTracksStore } from 'src/tracks/store/tracks.storage';
import { InMemoryAlbumsStore } from 'src/albums/store/albums.storage';
import { InMemoryFavsStore } from 'src/favs/store/favs.storage';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject('ArtistsStore')
    private artistStorage: InMemoryArtistsStore,
    @Inject('TracksStore')
    private tracksStorage: InMemoryTracksStore,
    @Inject('AlbumsStore')
    private albumsStorage: InMemoryAlbumsStore,
    @Inject('FavsStore')
    private favsStorage: InMemoryFavsStore,
  ) {}

  findAll() {
    return this.artistStorage.findAll();
  }

  findOne(id: string) {
    return this.artistStorage.findById(id);
  }

  create(createArtistDto: CreateArtistDto) {
    return this.artistStorage.create(createArtistDto);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.artistStorage.update(id, updateArtistDto);
  }

  delete(id: string) {
    const artist = this.artistStorage.delete(id);

    if (artist) {
      const track = this.tracksStorage.findByArtistId(artist.id);
      if (track) {
        track.artistId = null;
      }

      const album = this.albumsStorage.findByArtistId(artist.id);
      if (album) {
        album.artistId = null;
      }

      this.favsStorage.deleteArtist(artist.id);
    }
  }
}
