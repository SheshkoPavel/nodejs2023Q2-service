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

import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './entities/favorite.entity';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  findAll(): FavoritesResponse {
    return this.favoritesService.findAll();
  }

  // @Post('track/:id')
  // create(@Body()) {
  //   return this.favoritesService.create(createFavoriteDto);
  // }

  // @Get(':id')
  // findOne(@Param('id', new ParseUUIDPipe()) id: string) {
  //   return this.favoritesService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id', new ParseUUIDPipe()) id: string) {
  //   return this.favoritesService.remove(+id);
  // }
}
