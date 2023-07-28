import { Inject, Injectable } from '@nestjs/common';

import { InMemoryTracksStore } from './store/tracks.storage';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(@Inject('TracksStore') private storage: InMemoryTracksStore) {}

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    return this.storage.findById(id);
  }

  create(createTrackDto: CreateTrackDto) {
    return this.storage.create(createTrackDto);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.storage.update(id, updateTrackDto);
  }

  delete(id: string) {
    return this.storage.delete(id);
  }
}
