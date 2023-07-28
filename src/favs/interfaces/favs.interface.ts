import { Album } from 'src/albums/interfaces/album.interface';
import { Artist } from 'src/artists/interfaces/artist.interface';
import { Track } from 'src/tracks/interfaces/track.interface';

export interface Favs {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
