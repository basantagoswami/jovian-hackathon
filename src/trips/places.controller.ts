import { Body, Controller, Post } from '@nestjs/common';
import { PlacesService } from './places.service';
import { CurrentUser } from '../auth/decorators/current-user-decorator';
import { UserDto } from '../auth/dto/user.dto';
import { ExplorePlacesDto } from '../auth/dto/explore-pages.dto';

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
}
