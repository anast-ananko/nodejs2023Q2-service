import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { FavsAlbumEntity } from '../favs/entities/favs-album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(FavsAlbumEntity)
    private readonly favsAlbumRepository: Repository<FavsAlbumEntity>,
  ) {}

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });

    if (album) {
      return album;
    } else {
      throw new NotFoundException('Album not found');
    }
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const album = await this.albumRepository.save({
      ...createAlbumDto,
    });

    return await this.findOne(album.id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.findOne(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    } else {
      await this.albumRepository.update(id, updateAlbumDto);

      return await this.findOne(id);
    }
  }

  async delete(id: string) {
    const album = await this.findOne(id);

    if (album) {
      const favsAlbum = await this.favsAlbumRepository.find({
        where: { albumId: album.id },
      });

      await this.favsAlbumRepository.remove(favsAlbum);

      return await this.albumRepository.remove(album);
    }
  }
}
