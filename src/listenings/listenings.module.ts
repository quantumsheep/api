import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Listening } from './listening.entity';
import { ListeningsService } from './listenings.service';
import { TracksModule } from 'src/tracks/tracks.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Listening]),
    forwardRef(() => TracksModule),
    forwardRef(() => UsersModule),
  ],
  providers: [ListeningsService],
  exports: [ListeningsService]
})
export class ListeningsModule { }
