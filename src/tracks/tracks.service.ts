import { v4 as uuidv4 } from 'uuid';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InMemoryDb } from 'src/db/inMemoryDB';

@Injectable()
export class TracksService {
  constructor(private db: InMemoryDb) {}

  create(createTrackDto: CreateTrackDto) {
    const newTrack = { ...createTrackDto, id: uuidv4() };
    this.db.tracks.push(newTrack);

    return newTrack;
  }

  findAll() {
    return this.db.tracks;
  }

  findOne(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);

    if (!track) {
      return null;
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackIndex = this.db.tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      throw new HttpException(
        `Track with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedTrack = Object.assign(this.db.tracks[trackIndex], {
      ...updateTrackDto,
    });
    this.db.tracks[trackIndex] = updatedTrack;

    return updatedTrack;
  }

  remove(id: string) {
    const trackIndex = this.db.tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      throw new HttpException(
        `Track with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.db.tracks.splice(trackIndex, 1);
  }
}
