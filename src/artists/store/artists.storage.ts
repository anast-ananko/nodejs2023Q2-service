import { Injectable, Scope } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { ArtistsStore } from '../interfaces/artist-storage.interface';
import { Artist } from '../interfaces/artist.interface';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

@Injectable({ scope: Scope.DEFAULT })
export class InMemoryArtistsStore implements ArtistsStore {
  private artists: Artist[] = [];

  findAll() {
    return this.artists;
  }

  findById(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }

  create(dto: CreateArtistDto) {
    const newArtist = {
      id: uuidv4(),
      ...dto,
    };
    this.artists.push(newArtist);

    return newArtist;
  }

  update(id: string, dto: UpdateArtistDto) {
    const updatedArtist = this.artists.find((artist) => artist.id === id);

    updatedArtist.name = dto.name;
    updatedArtist.grammy = dto.grammy;

    return updatedArtist;
  }

  delete(id: string) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);

    if (artistIndex !== -1) {
      const deletedArtist = this.artists.splice(artistIndex, 1)[0];

      return deletedArtist;
    }

    return null;
  }
}
