import { Injectable } from '@nestjs/common';
import { ExplorePlacesDto } from '../auth/dto/explore-pages.dto';
import { UserDto } from '../auth/dto/user.dto';
import { OpenAiService } from '../openai/openai.service';
import { MapsService } from '../maps/maps.service';

@Injectable()
export class PlacesService {
  constructor(
    private readonly openaiService: OpenAiService,
    private readonly mapsService: MapsService,
  ) {}

  async explore(currentUser: UserDto, explorePlacesDto: ExplorePlacesDto) {
    return this.openaiService.fetchPlacesFromPrompt(
      explorePlacesDto.promptText,
    );
  }

  async details(currentUser: UserDto, placeName: string) {
    return this.mapsService.fetchPlaceDetails(placeName);
  }
}
