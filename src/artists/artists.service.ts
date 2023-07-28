import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InMemoryDb } from 'src/db/inMemoryDB';

@Injectable()
export class ArtistsService {
  constructor(private db: InMemoryDb) {}

  create(createArtistDto: CreateArtistDto) {
    const newArtist = { ...createArtistDto, id: uuidv4() };
    this.db.artists.push(newArtist);

    return newArtist;
  }

  findAll() {
    return this.db.artists;
  }

  findOne(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new HttpException(
        `Artist with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.findOne(id);

    if (!artist) {
      throw new HttpException(
        `Artist with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;

    return artist;
  }

  remove(id: string) {
    const artistIndex = this.db.artists.findIndex((artist) => artist.id === id);

    if (artistIndex === -1) {
      throw new HttpException(
        `Artist with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.db.artists.splice(artistIndex, 1);
  }
}
