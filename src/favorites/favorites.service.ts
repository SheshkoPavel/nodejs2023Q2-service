import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { InMemoryDb } from 'src/db/inMemoryDB';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class FavoritesService {
  constructor(
    private db: InMemoryDb,

    @Inject(forwardRef(() => ArtistsService))
    private readonly artistService: ArtistsService,

    @Inject(forwardRef(() => AlbumsService))
    private readonly albumService: AlbumsService,

    @Inject(forwardRef(() => TracksService))
    private readonly trackService: TracksService,
  ) {}

  findAll() {
    const { albums, artists, tracks } = this.db.favorites;

    const albumsObjects = albums.map((albumId) =>
      this.albumService.findOne(albumId),
    );

    const artistsObjects = artists.map((artistId) =>
      this.artistService.findOne(artistId),
    );

    const tracksObjects = tracks.map((trackId) =>
      this.trackService.findOne(trackId),
    );

    return {
      albums: albumsObjects,
      artists: artistsObjects,
      tracks: tracksObjects,
    };
  }
}
