import { Injectable } from '@nestjs/common';

import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class InMemoryDb {
  users: User[] = [];
  artists: Artist[] = [];
  tracks: Track[] = [];
}
