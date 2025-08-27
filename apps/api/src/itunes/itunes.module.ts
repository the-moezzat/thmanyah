import { Module } from '@nestjs/common';
import { iTunesController } from './itunes.controller';
import { iTunesService } from './itunes.service';

@Module({
  controllers: [iTunesController],
  providers: [iTunesService],
})
export class iTunesModule {}
