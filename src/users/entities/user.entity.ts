import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

const dateTransformer = {
  from: (value: Date) => value.getTime(),
  to: (value: number) => value,
};

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Exclude()
  @Column()
  password: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn({ transformer: dateTransformer })
  createdAt: number;

  @UpdateDateColumn({ transformer: dateTransformer })
  updatedAt: number;
}
