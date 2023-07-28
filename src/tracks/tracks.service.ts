import { Inject, Injectable } from '@nestjs/common';

import { InMemoryTracksStore } from './store/tracks.storage';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InMemoryFavsStore } from 'src/favs/store/favs.storage';

@Injectable()
export class TracksService {
  constructor(
    @Inject('TracksStore')
    private tracksStorage: InMemoryTracksStore,
    @Inject('FavsStore')
    private favsStorage: InMemoryFavsStore,
  ) {}

  findAll() {
    return this.tracksStorage.findAll();
  }

  findOne(id: string) {
    return this.tracksStorage.findById(id);
  }

  create(createTrackDto: CreateTrackDto) {
    return this.tracksStorage.create(createTrackDto);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.tracksStorage.update(id, updateTrackDto);
  }

  delete(id: string) {
    const track = this.tracksStorage.delete(id);

    if (track) {
      this.favsStorage.deleteTrack(track.id);
    }
  }
}
