import {
  Column,
  Entity,
  JoinColumn,
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
  @Column({ nullable: true })
  trackId: string;
}
