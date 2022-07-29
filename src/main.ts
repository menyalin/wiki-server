import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
   const config = new DocumentBuilder()
    .setTitle('Wiki Docs API')
    .setDescription('Description WIKI API')
    .setVersion('1.0')
    // .addTag('articles')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);


  app.enableCors()
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(parseInt(process.env.PORT), () => {
    console.log(`app started on  ${process.env.PORT}`)
  })

}
bootstrap()
