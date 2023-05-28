import { IsString } from 'class-validator';

export class ExplorePlacesDto {
  @IsString()
  promptText: string;
}
