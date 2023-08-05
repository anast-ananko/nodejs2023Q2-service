import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';

import { FavsArtistEntity } from './entities/favs-artist.entity';
import { FavsAlbumEntity } from './entities/favs-album.entity';
import { FavsTrackEntity } from './entities/favs-track.entity';
import { ArtistsService } from 'src/artists/artists.service';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';

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
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
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

    // Асинхронное преобразование массива favsArtist
    const artistPromises = favsArtist.map(async (artist: FavsArtistEntity) => {
      const foundArtist = await this.artistsRepository.find({
        where: { id: artist.artistId },
      });

      if (foundArtist) {
        return foundArtist[0];
      }
    });

    // Асинхронное преобразование массива favsAlbum
    const albumPromises = favsAlbum.map(async (album: FavsAlbumEntity) => {
      const foundAlbum = await this.albumsRepository.find({
        where: { id: album.albumId },
      });

      if (foundAlbum) {
        return foundAlbum[0];
      }
    });

    // Асинхронное преобразование массива favsTrack
    const trackPromises = favsTrack.map(async (track: FavsTrackEntity) => {
      const foundTrack = await this.tracksRepository.find({
        where: { id: track.trackId },
      });

      if (foundTrack) {
        return foundTrack[0];
      }
    });

    // Ожидание завершения всех асинхронных операций с помощью Promise.all
    favsData.artists = await Promise.all(artistPromises);
    favsData.albums = await Promise.all(albumPromises);
    favsData.tracks = await Promise.all(trackPromises);

    // favsArtist.forEach(async (artist: FavsArtistEntity) => {
    //   const foundArtist = await this.artistsRepository.find({
    //     where: { id: artist.artistId },
    //   });

    //   if (foundArtist) {
    //     favsData.artists.push(foundArtist[0]);
    //   }
    // });

    // favsAlbum.forEach(async (album: FavsAlbumEntity) => {
    //   const foundAlbum = await this.albumsRepository.find({
    //     where: { id: album.albumId },
    //   });

    //   if (foundAlbum) {
    //     favsData.albums.push(foundAlbum[0]);
    //   }
    // });

    // favsTrack.forEach(async (track: FavsTrackEntity) => {
    //   const foundTrack = await this.tracksRepository.find({
    //     where: { id: track.trackId },
    //   });

    //   if (foundTrack) {
    //     favsData.tracks.push(foundTrack[0]);
    //   }
    // });

    // favsData.artists = await Promise.all(
    //   favsArtist.map(
    //     async (artist: FavsArtistEntity) =>
    //       await this.artistsRepository.find({
    //         where: { id: artist.artistId },
    //       }),
    //   ),
    // );
    // favsData.albums = await Promise.all(
    //   favsAlbum.map(
    //     async (album: FavsAlbumEntity) =>
    //       await this.albumsRepository.find({ where: { id: album.albumId } }),
    //   ),
    // );
    // favsData.tracks = await Promise.all(
    //   favsTrack.map(
    //     async (track: FavsTrackEntity) =>
    //       await this.tracksRepository.find({ where: { id: track.trackId } }),
    //   ),
    // );
    console.log(favsData);
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
