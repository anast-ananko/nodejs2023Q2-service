import { Inject, Injectable } from '@nestjs/common';

import { InMemoryArtistsStore } from './store/artists.storage';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(@Inject('ArtistsStore') private storage: InMemoryArtistsStore) {}

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    return this.storage.findById(id);
  }

  create(createArtistDto: CreateArtistDto) {
    return this.storage.create(createArtistDto);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.storage.update(id, updateArtistDto);
  }

  delete(id: string) {
    return this.storage.delete(id);
  }
}
