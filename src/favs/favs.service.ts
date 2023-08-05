import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';

import { FavsArtistEntity } from './entities/favs-artist.entity';
import { FavsAlbumEntity } from './entities/favs-album.entity';
import { FavsTrackEntity } from './entities/favs-track.entity';
import { ArtistEntity } from '../artists/entities/artist.entity';
import { AlbumEntity } from '../albums/entities/album.entity';
import { TrackEntity } from '../tracks/entities/track.entity';

export interface FavsData {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(FavsArtistEntity)
    private readonly favsArtistRepository: Repository<FavsArtistEntity>,
    @InjectRepository(FavsAlbumEntity)
    private readonly favsAlbumRepository: Repository<FavsAlbumEntity>,
    @InjectRepository(FavsTrackEntity)
    private readonly favsTrackRepository: Repository<FavsTrackEntity>,
    @InjectRepository(ArtistEntity)
    private readonly artistsRepository: Repository<ArtistEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumsRepository: Repository<AlbumEntity>,
    @InjectRepository(TrackEntity)
    private readonly tracksRepository: Repository<TrackEntity>,
  ) {}

  async findAll() {
    const favsArtist = instanceToPlain(await this.favsArtistRepository.find());
    const favsAlbum = instanceToPlain(await this.favsAlbumRepository.find());
    const favsTrack = instanceToPlain(await this.favsTrackRepository.find());

    const favsData: FavsData = {
      artists: [],
      albums: [],
      tracks: [],
    };

    const artistPromises = favsArtist.map(async (artist: FavsArtistEntity) => {
      const foundArtist = await this.artistsRepository.find({
        where: { id: artist.artistId },
      });

      if (foundArtist) {
        return foundArtist[0];
      }
    });

    const albumPromises = favsAlbum.map(async (album: FavsAlbumEntity) => {
      const foundAlbum = await this.albumsRepository.find({
        where: { id: album.albumId },
      });

      if (foundAlbum) {
        return foundAlbum[0];
      }
    });

    const trackPromises = favsTrack.map(async (track: FavsTrackEntity) => {
      const foundTrack = await this.tracksRepository.find({
        where: { id: track.trackId },
      });

      if (foundTrack) {
        return foundTrack[0];
      }
    });

    favsData.artists = await Promise.all(artistPromises);
    favsData.albums = await Promise.all(albumPromises);
    favsData.tracks = await Promise.all(trackPromises);

    return favsData;
  }

  async addTrack(id: string) {
    const track = await this.tracksRepository.findOne({ where: { id } });

    if (track) {
      await this.favsTrackRepository.save({
        trackId: track.id,
      });
    } else {
      throw new UnprocessableEntityException('Track not found');
    }
  }

  async deleteTrack(id: string) {
    const track = await this.favsTrackRepository.findOne({
      where: { trackId: id },
    });

    if (track) {
      return await this.favsTrackRepository.delete({ trackId: id });
    } else {
      throw new NotFoundException('Track not found');
    }
  }

  async addAlbum(id: string) {
    const album = await this.albumsRepository.findOne({ where: { id } });

    if (album) {
      await this.favsAlbumRepository.save({
        albumId: album.id,
      });
    } else {
      throw new UnprocessableEntityException('Album not found');
    }
  }

  async deleteAlbum(id: string) {
    const album = await this.favsAlbumRepository.findOne({
      where: { albumId: id },
    });

    if (album) {
      return await this.favsAlbumRepository.delete({ albumId: id });
    } else {
      throw new NotFoundException('Album not found');
    }
  }

  async addArtist(id: string) {
    const artist = await this.artistsRepository.findOne({ where: { id } });

    if (artist) {
      await this.favsArtistRepository.save({
        artistId: artist.id,
      });
    } else {
      throw new UnprocessableEntityException('Artist not found');
    }
  }

  async deleteArtist(id: string) {
    const artist = await this.favsArtistRepository.findOne({
      where: { artistId: id },
    });

    if (artist) {
      return await this.favsArtistRepository.delete({ artistId: id });
    } else {
      throw new NotFoundException('Artist not found');
    }
  }
}
