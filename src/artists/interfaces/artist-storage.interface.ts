import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { Artist } from './artist.interface';

export interface ArtistsStore {
  findAll: () => Artist[];
  findById: (id: string) => Artist | undefined;
  create: (dto: CreateArtistDto) => Artist;
  update: (id: string, dto: UpdateArtistDto) => Artist;
  delete: (id: string) => Artist | null;
}
