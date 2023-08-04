//import { Favs } from './favs.interface';

export interface FavsStore {
  //findAll: () => Favs;
  addTrack: (id: string) => void;
  deleteTrack: (id: string) => string | null;
  addAlbum: (id: string) => void;
  deleteAlbum: (id: string) => string | null;
  addArtist: (id: string) => void;
  deleteArtist: (id: string) => string | null;
}
