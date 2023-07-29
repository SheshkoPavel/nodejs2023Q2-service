import { v4 as uuidv4 } from 'uuid';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InMemoryDb } from 'src/db/inMemoryDB';

@Injectable()
export class AlbumsService {
  constructor(private db: InMemoryDb) {}

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = { ...createAlbumDto, id: uuidv4() };
    this.db.albums.push(newAlbum);

    return newAlbum;
  }

  findAll() {
    return this.db.albums;
  }

  findOne(id: string) {
    const album = this.db.albums.find((album) => album.id === id);

    if (!album) {
      return null;
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumIndex = this.db.albums.findIndex((album) => album.id === id);

    if (albumIndex === -1) {
      throw new HttpException(
        `Album with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedAlbum = Object.assign(this.db.albums[albumIndex], {
      ...updateAlbumDto,
    });
    this.db.albums[albumIndex] = updatedAlbum;

    return updatedAlbum;
  }

  remove(id: string) {
    const albumIndex = this.db.albums.findIndex((album) => album.id === id);

    if (albumIndex === -1) {
      throw new HttpException(
        `Album with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.db.albums.splice(albumIndex, 1);
  }
}
