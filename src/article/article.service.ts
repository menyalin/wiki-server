import { Model, Types } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common';
import { Article, ArticleDocument } from './schemas/article.schema';
import { CreateArticleDto } from './dto/createArticle.dto';

@Injectable()
export class ArticleService {
  constructor(@InjectModel('Article') private ArticleModel: Model<ArticleDocument> ) {}

  async searchByTerm(term: string): Promise<Article[]> {
    return await this.ArticleModel.find({
        published: true,
        $text: {
          $search: term,
          $language: 'russian',
        },
      },
      { score: { $meta: 'textScore' } },
    ).sort({ score: { $meta: 'textScore' } })
  }
  
  async getAll(): Promise<Article[]> {
    return await this.ArticleModel.find().sort('listIndex').lean()
  }

  async getById(id: Types.ObjectId): Promise<Article> {
    return await this.ArticleModel.findById(id).lean()
  }

  async getFirst():Promise<Article> {
    return await this.ArticleModel.findOne({published: true}).sort({listInted: 1}).limit(1).lean()
  }

  async getBySlug(slug: string): Promise<Article> {
    return await this.ArticleModel.findOne({slug}).lean()
  }

  async create(body: CreateArticleDto): Promise<Article> {
    return await this.ArticleModel.create(body)
  } 

  async update(id: Types.ObjectId, body: CreateArticleDto): Promise<Article> {
    return await this.ArticleModel.findByIdAndUpdate(id, body, { returnDocument: 'after' })
  }

  async deleteById(id: Types.ObjectId): Promise<void> {
    await this.ArticleModel.deleteOne({ _id: id })
  }


}
