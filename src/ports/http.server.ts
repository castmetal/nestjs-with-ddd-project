import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from '../core/domains/common/errors/AllExceptionsFilter';
import { AppModule } from '../core/applications/modules/app.module';

export async function bootstrap() {
  const port = process.env.PORT ?? '3000';

  const app = await NestFactory.create(AppModule);

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(port);
}
