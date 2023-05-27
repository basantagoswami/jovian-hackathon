import { Body, Controller, Post } from '@nestjs/common';
import { PlacesService } from './places.service';
import { CurrentUser } from 'src/auth/decorators/current-user-decorator';
import { UserDto } from 'src/auth/dto/user.dto';
import { ExplorePlacesDto } from 'src/auth/dto/explore-pages.dto';

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
