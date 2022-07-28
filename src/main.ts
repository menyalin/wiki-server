import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(parseInt(process.env.PORT), () => {
    console.log(`app started on  ${process.env.PORT}`)
  })

}
bootstrap()
