import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Album } from 'src/albums/entities/album.entity';
import { Track } from 'src/tracks/entities/track.entity';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artistId)
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artistId)
  tracks: Track[];
}
