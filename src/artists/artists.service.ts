import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InMemoryTracksStore } from 'src/tracks/store/tracks.storage';
// import { InMemoryAlbumsStore } from 'src/albums/store/albums.storage';
import { InMemoryFavsStore } from 'src/favs/store/favs.storage';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
    @Inject('TracksStore')
    private tracksStorage: InMemoryTracksStore,
    // @Inject('AlbumsStore')
    // private albumsStorage: InMemoryAlbumsStore,
    @Inject('FavsStore')
    private favsStorage: InMemoryFavsStore,
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
      const track = this.tracksStorage.findByArtistId(artist.id);
      if (track) {
        track.artistId = null;
      }

      // const album = this.albumsStorage.findByArtistId(artist.id);
      // if (album) {
      //   album.artistId = null;
      // }

      this.favsStorage.deleteArtist(artist.id);

      return await this.artistRepository.delete({ id: artist.id });
    }
  }
}
