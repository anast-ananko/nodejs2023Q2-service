import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { ArtistEntity } from '../../artists/entities/artist.entity';

@Entity('favs-artist')
export class FavsArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @OneToOne(() => ArtistEntity, (artist) => artist.id)
  @JoinColumn({
    name: 'artistId',
    referencedColumnName: 'id',
  })
  artist: ArtistEntity;

  @Column({ nullable: true })
  artistId: string;
}
