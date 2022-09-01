import { Controller, Get } from '@nestjs/common';
import {
  AppService,
  HealthCheckResponse,
} from '../../core/applications/services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/healthCheck')
  healthCheck(): HealthCheckResponse {
    return this.appService.healthCheck();
  }
}
