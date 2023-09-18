import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'app.module';
import * as dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Access-Control-Allow-Credentials',
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    },
  });
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('First project')
    .setDescription(`The First Project's API documentation `)
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(
    process.env.APP_PORT || 3001,
    process.env.APP_HOST || '0.0.0.0',
  );
  logger.log(
    `Application is running on: ${await app.getUrl()} - Port: ${
      process.env.APP_PORT
    }`,
  );
}
bootstrap();
