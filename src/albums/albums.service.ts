import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TracksService } from 'src/tracks/tracks.service';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,

    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,

    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = await this.albumsRepository.create({ ...createAlbumDto });

    return await this.albumsRepository.save(newAlbum);
  }

  async findAll() {
    return await this.albumsRepository.find();
  }

  async findOne(id: string, skipErrors = false) {
    const album = await this.albumsRepository.findOne({ where: { id } });

    if (!album && !skipErrors) {
      throw new HttpException(
        `Album with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!album && skipErrors) {
      return null;
    }

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumsRepository.findOne({ where: { id } });

    if (!album) {
      throw new HttpException(
        `Album with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedAlbum = Object.assign(album, updateAlbumDto);

    return await this.albumsRepository.save(updatedAlbum);
  }

  async remove(id: string) {
    const album = await this.albumsRepository.findOne({ where: { id } });

    if (!album) {
      throw new HttpException(
        `Album with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.albumsRepository.delete(id);

    // this.tracksService.removeAlbum(id);
    // this.favoritesService.removeAlbumFromFav(id, true);
  }

  // removeArtist(id: string) {
  //   this.db.albums.forEach((album) => {
  //     if (album.artistId === id) {
  //       const updateAlbumDto = new UpdateAlbumDto();

  //       updateAlbumDto.artistId = null;

  //       this.update(album.id, updateAlbumDto);
  //     }
  //   });
  // }
}
