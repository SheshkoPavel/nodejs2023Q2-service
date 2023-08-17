import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';

@Entity('favorites')
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Album, (album) => album, { cascade: true })
  @JoinTable()
  albums: Album[];

  @ManyToMany(() => Artist, (artist) => artist, { cascade: true })
  @JoinTable()
  artists: Artist[];

  @ManyToMany(() => Track, (track) => track, { cascade: true })
  @JoinTable()
  tracks: Track[];
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
