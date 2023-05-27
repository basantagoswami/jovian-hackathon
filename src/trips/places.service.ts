import { Injectable } from '@nestjs/common';
import { ExplorePlacesDto } from '../auth/dto/explore-pages.dto';
import { UserDto } from '../auth/dto/user.dto';
import { OpenAiService } from '../openai/openai.service';
import { PlaceDetailsDto } from './dto/place-details.dto';
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

  async details(currentUser: UserDto, placeDetailsDto: PlaceDetailsDto) {
    return this.mapsService.fetchPlaceDetails(placeDetailsDto.placeName);
  }
}
