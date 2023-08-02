import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { Track } from './entities/track.entity';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [
    TypeOrmModule.forFeature([Track]),
    forwardRef(() => FavoritesModule),
  ],
  exports: [TracksService],
})
export class TracksModule {}
