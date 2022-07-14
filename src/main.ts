import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true
  });
  const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('Mi API documentación')
  .setDescription('Esto es prueba')
  .setVersion('1.0')
  .addTag('usuarios')
  .addTag('auth')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation',app, document);
  app.use(
    cookieParser(),
  );
  app.useGlobalPipes(new ValidationPipe);
  // app.use(csurf());
  await app.listen( process.env.PORT || 3000);
}
bootstrap();
