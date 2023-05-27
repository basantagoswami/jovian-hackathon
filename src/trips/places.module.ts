import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { OpenAiModule } from '../openai/openai.module';

@Module({
  imports: [OpenAiModule],
  providers: [PlacesService],
  controllers: [PlacesController],
})
export class PlacesModule {}
