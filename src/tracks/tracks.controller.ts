import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';

import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.tracksService.create(createTrackDto);
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<Track[]> {
    return await this.tracksService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Track> {
    return await this.tracksService.findOne(id);
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    return await this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return await this.tracksService.remove(id);
  }
}
