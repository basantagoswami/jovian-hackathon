import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PublicRoute } from './auth/decorators/public-route.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @PublicRoute()
  @Get()
  healthCheck(): string {
    return this.appService.healthCheck();
  }
}
