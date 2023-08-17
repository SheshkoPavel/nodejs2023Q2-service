import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';

import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './entities/favorite.entity';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  async findAll(): Promise<FavoritesResponse> {
    return await this.favoritesService.findAll();
  }

  @Post('track/:id')
  @HttpCode(201)
  async addTrackToFav(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addTrackToFav(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrackFromFav(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.favoritesService.removeTrackFromFav(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  async addAlbumToFav(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addAlbumToFav(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbumFromFav(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.favoritesService.removeAlbumFromFav(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  async addArtistToFav(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addArtistToFav(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtistFromFav(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.favoritesService.removeArtistFromFav(id);
  }
}
