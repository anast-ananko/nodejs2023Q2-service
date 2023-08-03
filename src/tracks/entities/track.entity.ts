import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';

@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id)
  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => AlbumEntity, (album) => album.id)
  @Column({ nullable: true })
  albumId: string | null;

  @Column()
  duration: number;
}
