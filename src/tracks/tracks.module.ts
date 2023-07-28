import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [DbModule],
})
export class TracksModule {}
