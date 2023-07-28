import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [DbModule],
})
export class AlbumsModule {}
