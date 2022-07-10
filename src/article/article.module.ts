import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from './schemas/article.schema';
import { GroupSchema } from './schemas/group.schema';
import { ArticleService } from './article.service';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Group', schema: GroupSchema}, {name: 'Article', schema: ArticleSchema}])],
  providers: [ArticleService, GroupService],
  controllers: [GroupController],
  
})
export class ArticleModule {}
