import { Controller, Post, Body, Put, Param, Get, HttpCode, Delete } from '@nestjs/common';
import { ParseObjectIdPipe } from 'src/pipes/parseObjectIdPipe';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleService } from './article.service';
import { Article } from './schemas/article.schema';
import { Types} from 'mongoose'

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post()
  async create (@Body() body: CreateArticleDto):Promise<Article> {
    return await this.articleService.create(body)
  }

  @Put(':id')
  async update(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @Body() body: CreateArticleDto ): Promise<Article>{
    return await this.articleService.update(id, body)
  }

  @Get()
  async getAll(): Promise<Article[]> {
    return await this.articleService.getAll()
  }

  @Get(':id')
  async getById(@Param('id', ParseObjectIdPipe) id: Types.ObjectId): Promise<Article> {
    return await this.articleService.getById(id)
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteById(@Param('id', ParseObjectIdPipe) id: Types.ObjectId): Promise<void> {
    await this.articleService.deleteById(id)
  }

}
