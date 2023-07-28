import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { Track } from './track.interface';

export interface TracksStore {
  findAll: () => Track[];
  findById: (id: string) => Track | undefined;
  create: (dto: CreateTrackDto) => Track;
  update: (id: string, dto: UpdateTrackDto) => Track;
  delete: (id: string) => Track | null;
}
