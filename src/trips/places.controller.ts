import { Body, Controller, Post } from '@nestjs/common';
import { PlacesService } from './places.service';
import { CurrentUser } from '../auth/decorators/current-user-decorator';
import { UserDto } from '../auth/dto/user.dto';
import { ExplorePlacesDto } from '../auth/dto/explore-pages.dto';
import { PlaceDetailsDto } from './dto/place-details.dto';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post('explore')
  async explore(
    @CurrentUser() currentUser: UserDto,
    @Body() explorePlacesDto: ExplorePlacesDto,
  ) {
    return this.placesService.explore(currentUser, explorePlacesDto);
  }

  @Post('details')
  async details(
    @CurrentUser() currentUser: UserDto,
    placeDetailsDto: PlaceDetailsDto,
  ) {
    return this.placesService.details(currentUser, placeDetailsDto);
  }
}
