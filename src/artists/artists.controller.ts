import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';

import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.artistsService.create(createArtistDto);
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<Artist[]> {
    return await this.artistsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Artist> {
    return await this.artistsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    return await this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return await this.artistsService.remove(id);
  }
}
