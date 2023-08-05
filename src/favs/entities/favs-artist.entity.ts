import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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

  // @ManyToMany(() => ArtistEntity, {
  //   eager: true,
  // })
  // @JoinTable()
  // artists: ArtistEntity[];

  @OneToOne(() => ArtistEntity, (artist) => artist.id)
  @JoinColumn({
    name: 'artistId',
    referencedColumnName: 'id',
  })
  artist: ArtistEntity;

  @Column({ nullable: true })
  artistId: string;
}
