import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { AlbumEntity } from '../../albums/entities/album.entity';

@Entity('favs-album')
export class FavsAlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @OneToOne(() => AlbumEntity, (album) => album.id)
  @JoinColumn({
    name: 'albumId',
    referencedColumnName: 'id',
  })
  album: AlbumEntity;

  @Column({ nullable: true })
  albumId: string;
}
