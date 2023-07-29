import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';

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
    const { artists, albums, tracks } = this.db.favorites;

    const artistsArray = artists.map((id) => this.artistService.findOne(id));
    const albumsArray = albums.map((id) => this.albumService.findOne(id));
    const tracksArray = tracks.map((id) => this.trackService.findOne(id));

    return {
      artists: artistsArray,
      albums: albumsArray,
      tracks: tracksArray,
    };
  }

  addTrackToFav(id: string) {
    const track = this.trackService.findOne(id);

    if (!track) {
      throw new HttpException(
        `Track with id: ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.db.favorites.tracks.push(id);

    return { message: `Track ${id} successfully added to favorites` };
  }
}
