import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';

@Entity('tracks')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  duration: number; // integer number

  @Column({ nullable: true })
  artistId: string | null; // refers to Artist

  @Column({ nullable: true })
  albumId: string | null; // refers to Album

  @ManyToOne(() => Album, (album) => album.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  album: Album;

  @ManyToOne(() => Artist, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist: Artist;
}
