import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { Album } from './entities/album.entity';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [
    TypeOrmModule.forFeature([Album]),
    forwardRef(() => FavoritesModule),
    forwardRef(() => TracksModule),
  ],
  exports: [AlbumsService],
})
export class AlbumsModule {}
