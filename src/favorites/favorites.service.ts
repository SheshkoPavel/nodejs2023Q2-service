import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { Favorites } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private readonly favoritesRepository: Repository<Favorites>,

    @Inject(forwardRef(() => ArtistsService))
    private readonly artistService: ArtistsService,

    @Inject(forwardRef(() => AlbumsService))
    private readonly albumService: AlbumsService,

    @Inject(forwardRef(() => TracksService))
    private readonly trackService: TracksService,
  ) {}

  async create() {
    const favorites = this.favoritesRepository.create();

    return await this.favoritesRepository.save(favorites);
  }

  async getFav() {
    let favorites = await this.favoritesRepository.find({
      relations: {
        albums: true,
        artists: true,
        tracks: true,
      },
    });

    if (favorites.length === 0) {
      await this.create();

      favorites = await this.favoritesRepository.find({
        relations: {
          albums: true,
          artists: true,
          tracks: true,
        },
      });
    }

    return favorites[0];
  }

  async findAll() {
    const favorites = await this.getFav();

    return {
      artists: favorites.artists,
      albums: favorites.albums,
      tracks: favorites.tracks,
    };
  }

  async addTrackToFav(id: string) {
    const track = await this.trackService.findOne(id, true);

    if (!track) {
      throw new HttpException(
        `Track with id: ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorites = await this.getFav();
    favorites.tracks.push(track);

    await this.favoritesRepository.save(favorites);

    return { message: `Track ${id} successfully added to favorites` };
  }

  async removeTrackFromFav(id: string, skipErrors = false) {
    const fav = await this.getFav();
    const track = fav.tracks.find((track) => track.id === id);

    if (!track && !skipErrors) {
      throw new HttpException(
        `Track with id: ${id}, not found in favorites`,
        HttpStatus.NOT_FOUND,
      );
    }

    fav.tracks = fav.tracks.filter((track) => track.id !== id);

    await this.favoritesRepository.save(fav);
  }

  async addAlbumToFav(id: string) {
    const album = await this.albumService.findOne(id, true);

    if (!album) {
      throw new HttpException(
        `Album with id: ${id}, not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const fav = await this.getFav();
    fav.albums.push(album);

    await this.favoritesRepository.save(fav);

    return { message: `Album ${id} successfully added to favorites` };
  }

  async removeAlbumFromFav(id: string, skipErrors = false) {
    const fav = await this.getFav();
    const album = fav.albums.find((album) => album.id === id);

    if (!album && !skipErrors) {
      throw new HttpException(
        `Album with id: ${id}, not found in favorites`,
        HttpStatus.NOT_FOUND,
      );
    }

    fav.albums = fav.albums.filter((album) => album.id !== id);

    await this.favoritesRepository.save(fav);
  }

  async addArtistToFav(id: string) {
    const artist = await this.artistService.findOne(id, true);

    if (!artist) {
      throw new HttpException(
        `Artist with id: ${id}, not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const fav = await this.getFav();
    fav.artists.push(artist);

    await this.favoritesRepository.save(fav);

    return { message: `Artist ${id} successfully added to favorites` };
  }

  async removeArtistFromFav(id: string, skipErrors = false) {
    const fav = await this.getFav();
    const artist = fav.artists.find((artist) => artist.id === id);

    if (!artist && !skipErrors) {
      throw new HttpException(
        `Artist with id: ${id}, not found in favorites`,
        HttpStatus.NOT_FOUND,
      );
    }

    fav.artists = fav.artists.filter((artist) => artist.id !== id);

    await this.favoritesRepository.save(fav);
  }
}
