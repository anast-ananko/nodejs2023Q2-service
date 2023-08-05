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

import { TrackEntity } from '../../tracks/entities/track.entity';

@Entity('favs-track')
export class FavsTrackEntity {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @OneToOne(() => TrackEntity, (track) => track.id)
  @JoinColumn({
    name: 'trackId',
    referencedColumnName: 'id',
  })

  // @ManyToMany(() => TrackEntity, {
  //   eager: true,
  // })
  // @JoinTable()
  // tracks: TrackEntity[];
  @Column({ nullable: true })
  trackId: string;
}
