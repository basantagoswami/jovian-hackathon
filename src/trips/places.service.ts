import { Injectable } from '@nestjs/common';
import { ExplorePlacesDto } from '../auth/dto/explore-pages.dto';
import { UserDto } from '../auth/dto/user.dto';
import { OpenAiService } from '../openai/openai.service';

@Injectable()
export class PlacesService {
  constructor(private readonly openaiService: OpenAiService) {}

  async explore(currentUser: UserDto, explorePlacesDto: ExplorePlacesDto) {
    return this.openaiService.fetchPlacesFromPrompt(
      explorePlacesDto.promptText,
    );
  }
}
