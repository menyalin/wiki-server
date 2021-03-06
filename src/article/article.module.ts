import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ArticleSchema } from './schemas/article.schema'
import { GroupSchema } from './schemas/group.schema'
import { ArticleService } from './article.service'
import { GroupService } from './group.service'
import { GroupController } from './group.controller'
import { ArticleController } from './article.controller'
import { MenuController } from './menu.controller'
import { MenuService } from './menu.service'

@Module({
  imports: [MongooseModule.forFeature([{name: 'Group', schema: GroupSchema}, {name: 'Article', schema: ArticleSchema}])],
  providers: [ArticleService, GroupService, MenuService],
  controllers: [GroupController, ArticleController, MenuController],
  
})
export class ArticleModule {}
