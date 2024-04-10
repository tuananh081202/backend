import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session'
import * as passport from 'passport';

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
  app.use(session({
    secret:'fbishsdiberiwnfwssnfdahda',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge:60000,
    }
  })
)
  app.use(passport.initialize());
  app.use(passport.session())
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors(); 
  app.useStaticAssets(join(__dirname, '../../'));
  await app.listen(5000);

}
bootstrap();
