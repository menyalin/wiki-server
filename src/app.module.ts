import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config' 
import { ArticleModule } from './article/article.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({    isGlobal: true  }),
    MongooseModule.forRoot(process.env.MONGO_URL), 
    ArticleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
