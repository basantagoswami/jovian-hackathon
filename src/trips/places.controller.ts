import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PlacesService } from './places.service';
import { CurrentUser } from '../auth/decorators/current-user-decorator';
import { UserDto } from '../auth/dto/user.dto';
import { ExplorePlacesDto } from './dto/explore-places.dto';
import { ScheduleTripDto } from './dto/schedule-trip.dto';

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

  @Get('details')
  async details(
    @CurrentUser() currentUser: UserDto,
    @Query('placeName') placeName: string,
  ) {
    return this.placesService.details(currentUser, placeName);
  }

  @Post('schedule')
  async schedule(
    @CurrentUser() currentUser: UserDto,
    @Body() scheduleTripDto: ScheduleTripDto,
  ) {
    return this.placesService.schedule(currentUser, scheduleTripDto);
  }
}
