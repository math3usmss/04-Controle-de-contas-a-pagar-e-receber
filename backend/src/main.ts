import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import CookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: process.env.PUBLIC_API_URL ?? 'http://localhost:3000',
    credentials: true,
  });
  app.useGlobalPipes();
  app.use(CookieParser());
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Starter Nest API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  app.enableShutdownHooks();

  await app.listen(process.env.PORT ?? 3001);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
