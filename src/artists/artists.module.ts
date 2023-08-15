import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { Artist } from './entities/artist.entity';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [
    TypeOrmModule.forFeature([Artist]),
    forwardRef(() => FavoritesModule),
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
  ],
  exports: [ArtistsService],
})
export class ArtistsModule {}
