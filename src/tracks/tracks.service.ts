import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { FavsTrackEntity } from 'src/favs/entities/favs-track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
    @InjectRepository(FavsTrackEntity)
    private readonly favsTrackRepository: Repository<FavsTrackEntity>, // @Inject('FavsStore') // private favsStorage: InMemoryFavsStore,
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
    // const track = await this.trackRepository.save({
    //   ...createTrackDto,
    //   // artistId: null,
    //   // albumId: null,
    // });

    const track = await this.trackRepository.save({
      name: createTrackDto.name,
      artistId:
        createTrackDto.artistId === undefined ? null : createTrackDto.artistId,
      albumId:
        createTrackDto.albumId === undefined ? null : createTrackDto.albumId,
      duration: createTrackDto.duration,
    });
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
      const favsTrack = await this.favsTrackRepository.find({
        where: { trackId: track.id },
      });

      await this.favsTrackRepository.remove(favsTrack);

      return await this.trackRepository.remove(track);
    }
  }
}
