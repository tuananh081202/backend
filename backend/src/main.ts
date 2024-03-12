import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);// stactic file
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
  await app.listen(5000);

}
bootstrap();
