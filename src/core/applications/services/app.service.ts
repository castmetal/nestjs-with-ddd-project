import { Injectable } from '@nestjs/common';

export type HealthCheckResponse = {
  status: boolean;
};

@Injectable()
export class AppService {
  healthCheck(): HealthCheckResponse {
    return { status: true };
  }
}
