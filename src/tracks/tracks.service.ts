import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

import { FavoritesService } from 'src/favorites/favorites.service';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,

    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const newTrack = await this.tracksRepository.create({ ...createTrackDto });

    return await this.tracksRepository.save(newTrack);
  }

  async findAll() {
    return await this.tracksRepository.find();
  }

  async findOne(id: string, skipErrors = false) {
    const track = await this.tracksRepository.findOne({ where: { id } });

    if (!track && !skipErrors) {
      throw new HttpException(
        `Track with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!track && skipErrors) {
      return null;
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.findOne(id);

    if (!track) {
      throw new HttpException(
        `Track with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedTrack = Object.assign(track, updateTrackDto);

    return await this.tracksRepository.save(updatedTrack);
  }

  async remove(id: string) {
    const track = await this.findOne(id);

    if (!track) {
      throw new HttpException(
        `Track with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.tracksRepository.delete(id);
  }

  // removeArtist(id: string) {
  //   this.db.tracks.forEach((track) => {
  //     if (track.artistId === id) {
  //       const updateTrackDto = new UpdateTrackDto();

  //       updateTrackDto.artistId = null;

  //       this.update(track.id, updateTrackDto);
  //     }
  //   });
  // }

  // removeAlbum(id: string) {
  //   this.db.tracks.forEach((track) => {
  //     if (track.albumId === id) {
  //       const updateTrackDto = new UpdateTrackDto();

  //       updateTrackDto.albumId = null;

  //       this.update(track.id, updateTrackDto);
  //     }
  //   });
  // }
}
