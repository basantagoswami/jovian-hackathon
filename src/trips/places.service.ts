import { Injectable } from '@nestjs/common';
import { ExplorePlacesDto } from 'src/auth/dto/explore-pages.dto';
import { UserDto } from 'src/auth/dto/user.dto';

@Injectable()
export class PlacesService {
  async explore(currentUser: UserDto, explorePlacesDto: ExplorePlacesDto) {
    return {};
  }
}
