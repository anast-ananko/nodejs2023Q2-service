import { Favs } from './favs.interface';
import { Track } from 'src/tracks/interfaces/track.interface';
import { Album } from 'src/albums/interfaces/album.interface';
import { Artist } from 'src/artists/interfaces/artist.interface';

export interface FavsStore {
  findAll: () => Favs;
  addTrack: (track: Track) => void;
  deleteTrack: (id: string) => Track | null;
  addAlbum: (album: Album) => void;
  deleteAlbum: (id: string) => Album | null;
  addArtist: (album: Artist) => void;
  deleteArtist: (id: string) => Artist | null;
}
