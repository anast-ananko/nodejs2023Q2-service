import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { Album } from './album.interface';

export interface AlbumsStore {
  findAll: () => Album[];
  findById: (id: string) => Album | undefined;
  create: (dto: CreateAlbumDto) => Album;
  update: (id: string, dto: UpdateAlbumDto) => Album;
  delete: (id: string) => Album | null;
}
