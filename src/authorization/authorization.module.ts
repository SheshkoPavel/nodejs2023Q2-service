import { Module } from '@nestjs/common';

import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
  imports: [UsersModule],
})
export class AuthorizationModule {}
