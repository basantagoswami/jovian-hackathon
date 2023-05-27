import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { OpenAiModule } from '../openai/openai.module';
import { MapsModule } from 'src/maps/maps.module';

@Module({
  imports: [OpenAiModule, MapsModule],
  providers: [PlacesService],
  controllers: [PlacesController],
})
export class PlacesModule {}
