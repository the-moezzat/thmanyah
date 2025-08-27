import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { iTunesModule } from './itunes/itunes.module';

@Module({
  imports: [iTunesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
