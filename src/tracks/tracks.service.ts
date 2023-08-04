import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>, // @Inject('FavsStore') // private favsStorage: InMemoryFavsStore,
  ) {}

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });

    if (track) {
      return track;
    } else {
      throw new NotFoundException('Track not found');
    }
  }

  async create(createTrackDto: CreateTrackDto) {
    const track = await this.trackRepository.save({
      ...createTrackDto,
      artistId: null,
      albumId: null,
    });

    console.log(await this.findOne(track.id));
    return await this.findOne(track.id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.findOne(id);

    if (!track) {
      throw new NotFoundException('Track not found');
    } else {
      await this.trackRepository.update(id, updateTrackDto);
      return await this.findOne(id);
    }
  }

  async delete(id: string) {
    const track = await this.findOne(id);

    if (track) {
      return await this.trackRepository.delete({ id: track.id });
    }
  }
}
