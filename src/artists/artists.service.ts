import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { FavsArtistEntity } from '../favs/entities/favs-artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
    @InjectRepository(FavsArtistEntity)
    private readonly favsArtistRepository: Repository<FavsArtistEntity>,
  ) {}

  async findAll() {
    return await this.artistRepository.find();
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (artist) {
      return artist;
    } else {
      throw new NotFoundException('Artist not found');
    }
  }

  async create(createArtistDto: CreateArtistDto) {
    const artist = await this.artistRepository.save({
      ...createArtistDto,
    });

    return await this.findOne(artist.id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    } else {
      await this.artistRepository.update(id, updateArtistDto);

      return await this.findOne(id);
    }
  }

  async delete(id: string) {
    const artist = await this.findOne(id);

    if (artist) {
      const favsArtist = await this.favsArtistRepository.find({
        where: { artistId: artist.id },
      });

      await this.favsArtistRepository.remove(favsArtist);

      return await this.artistRepository.remove(artist);
    }
  }
}
