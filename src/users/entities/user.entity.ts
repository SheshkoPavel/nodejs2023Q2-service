import { Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  login: string;

  @Column()
  password: string;

  @VersionColumn()
  version: number; // integer number, increments on update

  @CreateDateColumn()
  @Transform(({ value }) => new Date(value).getTime())
  createdAt: number; // timestamp of creation

  @UpdateDateColumn()
  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: number; // timestamp of last update

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
