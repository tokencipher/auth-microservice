import { Module, HttpModule } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  imports: [HttpModule],
  exports: [UsersService]
})
export class UsersModule {}
