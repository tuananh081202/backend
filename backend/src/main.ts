import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);// stactic file
  const config = new DocumentBuilder()
    .setTitle('APIs')
    .setDescription('APIs')
    .setVersion('1.0')
    .addTag('User')
    .addBearerAuth()
    .build();
  
  app.setGlobalPrefix('api');
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  app.useStaticAssets(join(__dirname, '../../'));
  await app.listen(5000);

}
bootstrap();
