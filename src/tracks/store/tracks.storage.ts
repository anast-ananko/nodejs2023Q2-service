import { Injectable, Scope } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { TracksStore } from '../interfaces/track-storage.interface';
import { Track } from '../interfaces/track.interface';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Injectable({ scope: Scope.DEFAULT })
export class InMemoryTracksStore implements TracksStore {
  private tracks: Track[] = [];

  findAll() {
    return this.tracks;
  }

  findById(id: string) {
    return this.tracks.find((track) => track.id === id);
  }

  create(dto: CreateTrackDto) {
    const newTrack = {
      id: uuidv4(),
      ...dto,
    };
    this.tracks.push(newTrack);

    return newTrack;
  }

  update(id: string, dto: UpdateTrackDto) {
    const updatedTrack = this.tracks.find((track) => track.id === id);

    updatedTrack.name = dto.name;
    updatedTrack.artistId = dto.artistId;
    updatedTrack.albumId = dto.albumId;
    updatedTrack.duration = dto.duration;

    return updatedTrack;
  }

  delete(id: string) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);

    if (trackIndex !== -1) {
      const deletedTrack = this.tracks.splice(trackIndex, 1)[0];

      return deletedTrack;
    }

    return null;
  }
}
