import { IsDateString, IsString } from 'class-validator';

export class ScheduleTripDto {
  @IsString()
  city: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
