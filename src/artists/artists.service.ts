import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { FavoritesService } from 'src/favorites/favorites.service';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,

    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,

    @Inject(forwardRef(() => AlbumsService))
    private readonly albumService: AlbumsService,

    @Inject(forwardRef(() => TracksService))
    private readonly trackService: TracksService,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = await this.artistsRepository.create({
      ...createArtistDto,
    });

    return await this.artistsRepository.save(newArtist);
  }

  async findAll() {
    return await this.artistsRepository.find();
  }

  async findOne(id: string, skipErrors = false) {
    const artist = await this.artistsRepository.findOne({ where: { id } });

    if (!artist && !skipErrors) {
      throw new HttpException(
        `Artist with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!artist && skipErrors) {
      return null;
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artistsRepository.findOne({ where: { id } });

    if (!artist) {
      throw new HttpException(
        `Artist with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedArtist = Object.assign(artist, updateArtistDto);

    return await this.artistsRepository.save(updatedArtist);
  }

  async remove(id: string) {
    const artist = await this.artistsRepository.findOne({ where: { id } });

    if (!artist) {
      throw new HttpException(
        `Artist with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.artistsRepository.delete(id);

    // this.albumService.removeArtist(id);
    // this.trackService.removeArtist(id);
    // this.favoritesService.removeArtistFromFav(id, true);
  }
}
