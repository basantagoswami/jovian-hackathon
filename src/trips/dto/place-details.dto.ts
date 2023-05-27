import { IsString } from 'class-validator';

export class PlaceDetailsDto {
  @IsString()
  placeName: string;
}
